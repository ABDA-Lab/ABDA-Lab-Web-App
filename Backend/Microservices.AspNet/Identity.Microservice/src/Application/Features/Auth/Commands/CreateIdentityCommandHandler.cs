using Application.Abstractions.Messaging;
using Application.Abstractions.UnitOfWork;
using Application.Common.ResponseModel;
using AutoMapper;
using Domain.Entities;
using MassTransit;
using Microsoft.AspNetCore.Identity;
using SharedLibrary.Contracts.UserRegisterFlow;

namespace Application.Features.Auth.Commands
{

    public sealed record CreateIdentityCommand(
    string Username,
    string Password
    ) : ICommand;

    internal sealed class CreateIdentityCommandHandler : ICommandHandler<CreateIdentityCommand>
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        private readonly IPublishEndpoint _publishEndpoint;

        public CreateIdentityCommandHandler(UserManager<User> userManager, IMapper mapper, IPublishEndpoint publishEndpoint)
        {
            _mapper = mapper;
            _userManager = userManager;
            _publishEndpoint = publishEndpoint;
        }
        public async Task<Result> Handle(CreateIdentityCommand command, CancellationToken cancellationToken)
        {
            var newUser = _mapper.Map<User>(command);
            newUser.Id = Guid.NewGuid();
            var result = await _userManager.CreateAsync(newUser, command.Password);
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                return Result.Failure(new Error("RegisterUserCommand", errors));
            }
            await _publishEndpoint.Publish(new IdentityCreatedEvent{
               UserId = newUser.Id,
               Username = command.Username
            });
            return Result.Success();
        }
    }
}