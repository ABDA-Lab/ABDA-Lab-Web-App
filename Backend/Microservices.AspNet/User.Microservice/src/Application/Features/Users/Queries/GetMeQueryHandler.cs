using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SharedLibrary.Abstractions.Messaging;
using SharedLibrary.ResponseModel;
using AutoMapper;
using Domain.Repositories;
using MediatR;

namespace Application.Features.Users.Queries
{
    public sealed record GetMeQuery(Guid usrID) : IQuery<GetMeResponse>;
    internal sealed class GetMeQueryHandler : IQueryHandler<GetMeQuery, GetMeResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public GetMeQueryHandler(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }


        public async Task<Result<GetMeResponse>> Handle(GetMeQuery request, CancellationToken cancellationToken)
        {
            GetMeResponse response = new GetMeResponse();
            var user = await _userRepository.GetByIdAsync(request.usrID, cancellationToken);
            return Result<GetMeResponse>.Success(_mapper.Map(user, response));
        }
    }
}