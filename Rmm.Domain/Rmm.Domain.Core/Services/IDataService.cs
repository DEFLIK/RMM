using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Rmm.Domain.DAL.Interfaces;

namespace Rmm.Domain.Core.Services
{
    public interface IDataService<T> where T : class, IEntity
    {
        public Task<Guid> Create(T entity);
        public Task<T> Get(Guid id);
        public Task<T[]> Get(Expression<Func<T, bool>> selector);
        public Task<T[]> GetRange(int start, int count);
        public Task Update(T entity);
        public Task Delete(Guid id);
    }
}
