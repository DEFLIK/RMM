using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Rmm.Domain.DAL.Entities;
using Rmm.Domain.DAL.Interfaces;

namespace Rmm.Domain.Core.Services.DeviceDataService
{
    public class DeviceDataService : IDataService<DeviceInfo>
    {
        private readonly IDbRepository _dbRepository;

        public DeviceDataService(IDbRepository dbRepository)
        {
            _dbRepository = dbRepository;
        }

        public async Task<Guid> Create(DeviceInfo entity)
        {
            var id = await _dbRepository.Add(entity);
            await _dbRepository.SaveChangesAsync();
            return id;
        }

        public async Task<DeviceInfo> Get(Guid id)
        {
            var entity = await _dbRepository.Get<DeviceInfo>(device => device.Id == id).FirstOrDefaultAsync();
            return entity;
        }

        public async Task<DeviceInfo[]> GetRange(int start, int count)
        {
            return await _dbRepository.GetRange<DeviceInfo>(start, count).ToArrayAsync();
        }

        public async Task Update(DeviceInfo entity)
        {
            await _dbRepository.Update(entity);
            await _dbRepository.SaveChangesAsync();
        }

        public async Task Delete(Guid id)
        {
            var entity = await Get(id);

            await _dbRepository.Remove(entity);
            await _dbRepository.SaveChangesAsync();
        }
    }
}
