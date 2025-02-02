using SharedLibrary.Abstractions.Messaging;
using SharedLibrary.Abstractions.UnitOfWork;
using SharedLibrary.ResponseModel;
using AutoMapper;
using Domain.Entities;
using MassTransit;
using Microsoft.AspNetCore.Identity;
using SharedLibrary.Contracts.UserRegisterFlow;
using SharedLibrary.Enum;

namespace Application.Features.Auth.Commands
{

    public sealed record CreateIdentityCommand(
    string Username,
    string Password,
    string ConfirmPassword
    ) : ICommand;

    internal sealed class CreateIdentityCommandHandler : ICommandHandler<CreateIdentityCommand>
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;

        public CreateIdentityCommandHandler(RoleManager<Role> roleManager,UserManager<User> userManager, IMapper mapper, IPublishEndpoint publishEndpoint)
        {
            _mapper = mapper;
            _userManager = userManager;
            _publishEndpoint = publishEndpoint;
            _roleManager = roleManager;
        }
        public async Task<Result> Handle(CreateIdentityCommand command, CancellationToken cancellationToken)
        {
            var newUser = _mapper.Map<User>(command);
            newUser.Id = Guid.NewGuid();
            var createUserResult = await _userManager.CreateAsync(newUser, command.Password);
            if (!createUserResult.Succeeded)
            {
                var errors = string.Join(", ", createUserResult.Errors.Select(e => e.Description));
                return Result.Failure(new Error("RegisterUserCommand", errors));
            }
            var roleAssignResult = await _userManager.AddToRoleAsync(newUser,  nameof(RoleEnum.User));
            var role = await _roleManager.FindByNameAsync(nameof(RoleEnum.User))??new Role();
            if (!roleAssignResult.Succeeded)
            {
                var roleErrors = string.Join(", ", roleAssignResult.Errors.Select(e => e.Description));
                return Result.Failure(new Error("AssignRole", $"Failed to assign role '{nameof(RoleEnum.User)}' to user: {roleErrors}"));
            }

            await _publishEndpoint.Publish(new IdentityUserCreatedEvent{
               UserId = newUser.Id,
               RoleId = role.Id,
               Username = command.Username
            });
            return Result.Success();
        }
    }
}