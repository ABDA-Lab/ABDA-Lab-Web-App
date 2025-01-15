using Application.Abstractions.Messaging;
using Application.Abstractions.UnitOfWork;
using Application.Common;
using Application.Common.ResponseModel;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories;
using MassTransit;
using MediatR;

namespace Application.Features.Users.Commands
{
    public sealed record CreateUserCommand(
        Guid UserId,
        Guid RoleId,
        string Username
    ) : ICommand; 
    internal sealed class CreateUserCommandHandler : BaseCommandHandler<CreateUserCommand>
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;

        public CreateUserCommandHandler(IRoleRepository roleRepository,IUserRepository userRepository, IMapper mapper, IUnitOfWork unitOfWork) : base(mapper, unitOfWork)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
        }

        public override async Task<Result> Handle(CreateUserCommand command, CancellationToken cancellationToken)
        {
            try
            {
                var role = await _roleRepository.GetByIdAsync(command.RoleId, cancellationToken);
                var newUser = _mapper.Map<User>(command);
                newUser.Roles.Add(role);
                await _userRepository.AddAsync(newUser, cancellationToken);
                await _unitOfWork.SaveChangesAsync(cancellationToken);
                return Result.Success();
            }
            catch (Exception e)
            {
                return Result.Failure(new Error("CreateUserCommand", e.Message));
            }

        }
    }
}