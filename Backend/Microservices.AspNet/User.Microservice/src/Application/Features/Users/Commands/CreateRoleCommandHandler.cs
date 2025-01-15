using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Abstractions.Messaging;
using Application.Abstractions.UnitOfWork;
using Application.Common;
using Application.Common.ResponseModel;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories;

namespace Application.Features.Users.Commands
{
    public sealed record CreateRoleCommand
    (
        Guid RoleId,
        string Name
    ) : ICommand;
    internal sealed class CreateRoleCommandHandler : BaseCommandHandler<CreateRoleCommand>
    {
        private readonly IRoleRepository _roleRepository;
        public CreateRoleCommandHandler(IRoleRepository roleRepository,IMapper mapper, IUnitOfWork unitOfWork) : base(mapper, unitOfWork)
        {
            _roleRepository = roleRepository;
        }

        public override async Task<Result> Handle(CreateRoleCommand request, CancellationToken cancellationToken)
        {
            try
            {
                await _roleRepository.AddAsync(_mapper.Map<Role>(request), cancellationToken);
                await _unitOfWork.SaveChangesAsync(cancellationToken);
                return Result.Success();
            }
            catch (Exception e)
            {
                return Result.Failure(new Error("CreateRoleCommand",e.Message));
            }
        }

    }
}