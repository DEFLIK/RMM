using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Interfaces;

namespace web_core.Services
{
    public interface IDataService<T> where T : class, IEntity
    {
        Task<Guid> Create(T lead);
        Task<T> Get(Guid id);
        Task Update(T lead);
        Task Delete(Guid leadId);
    }
}
