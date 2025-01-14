using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Features.Auth.Commands;

// using Application.Guests.Commands;
// using Application.Guests.Queries;
using AutoMapper;
using Domain.Entities;

namespace Application.Common.Mapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<CreateIdentityCommand, User>();
            CreateMap<User, CreateIdentityCommand>();
        }
        
    }
}