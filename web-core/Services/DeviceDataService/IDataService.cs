using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Interfaces;

namespace web_core.Services
{
    public interface IDataService<T> where T : class, IEntity
    {
        public Task<Guid> Create(T lead);
        public Task<T> Get(Guid id);
        public Task Update(T lead);
        public Task Delete(Guid leadId);
    }
}
