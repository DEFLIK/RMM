using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Rmm.Domain.DAL.Interfaces;

namespace Rmm.Domain.DAL.Repositories
{
    public class DbRepository : IDbRepository
    {
        private readonly DataContext _context;

        public DbRepository(DataContext context)
        {
            _context = context;
        }

        public IQueryable<T> Get<T>() where T : class, IEntity
        {
            return _context.Set<T>().AsQueryable();
        }

        public IQueryable<T> GetRange<T>(int start, int count) where T : class, IEntity
        {
            return _context.Set<T>().OrderBy(x => x.Id).Skip(start).Take(count).AsQueryable();
        }

        public IQueryable<T> Get<T>(Expression<Func<T, bool>> selector) where T : class, IEntity
        {
            return _context.Set<T>().Where(selector).AsQueryable();
        }

        public async Task<Guid> Add<T>(T newEntity) where T : class, IEntity
        {
            var entity = await _context.Set<T>().AddAsync(newEntity);
            return entity.Entity.Id;
        }

        public async Task AddRange<T>(IEnumerable<T> newEntities) where T : class, IEntity
        {
            await _context.Set<T>().AddRangeAsync(newEntities);
        }

        public async Task Remove<T>(T entity) where T : class, IEntity
        {
            await Task.Run(() => _context.Set<T>().Remove(entity));
        }

        public async Task RemoveRange<T>(IEnumerable<T> entities) where T : class, IEntity
        {
            await Task.Run(() => _context.Set<T>().RemoveRange(entities));
        }

        public async Task Update<T>(T entity) where T : class, IEntity
        {
            await Task.Run(() => _context.Set<T>().Update(entity));
        }

        public async Task UpdateRange<T>(IEnumerable<T> entities) where T : class, IEntity
        {
            await Task.Run(() => _context.Set<T>().UpdateRange(entities));
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public IQueryable<T> GetAll<T>() where T : class, IEntity
        {
            return _context.Set<T>().AsQueryable();
        }
    }
}
