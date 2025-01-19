using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SharedLibrary.Abstractions.Messaging;
using SharedLibrary.Abstractions.UnitOfWork;
using SharedLibrary.ResponseModel;
using AutoMapper;

namespace Application.SharedLibrary
{
    public abstract class BaseCommandHandler<TCommand, TResponse> : ICommandHandler<TCommand, TResponse>
        where TCommand : ICommand<TResponse>
    {
        protected readonly IMapper _mapper;
        protected readonly IUnitOfWork _unitOfWork;

        protected BaseCommandHandler(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public abstract Task<Result<TResponse>> Handle(TCommand command, CancellationToken cancellationToken);
    }

    public abstract class BaseCommandHandler<TCommand> : ICommandHandler<TCommand>
        where TCommand : ICommand
    {
        protected readonly IMapper _mapper;
        protected readonly IUnitOfWork _unitOfWork;

        protected BaseCommandHandler(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public abstract Task<Result> Handle(TCommand command, CancellationToken cancellationToken);
    }
}