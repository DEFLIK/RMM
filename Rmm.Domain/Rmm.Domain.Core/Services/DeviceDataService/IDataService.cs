using System;
using System.Threading.Tasks;
using Rmm.Domain.DAL.Interfaces;

namespace Rmm.Domain.Core.Services.DeviceDataService
{
    public interface IDataService<T> where T : class, IEntity
    {
        public Task<Guid> Create(T lead);
        public Task<T> Get(Guid id);
        public Task Update(T lead);
        public Task Delete(Guid leadId);
    }
}
