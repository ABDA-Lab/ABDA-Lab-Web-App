using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SharedLibrary.Abstractions.Repositories;

namespace SharedLibrary.Abstractions.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<T> Repository<T>() where T : class;
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}