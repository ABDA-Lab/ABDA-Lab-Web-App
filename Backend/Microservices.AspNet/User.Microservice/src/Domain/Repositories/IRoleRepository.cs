using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SharedLibrary.Abstractions.Repositories;
using Domain.Entities;

namespace Domain.Repositories
{
    public interface IRoleRepository : IRepository<Role>
    {
        
    }
}