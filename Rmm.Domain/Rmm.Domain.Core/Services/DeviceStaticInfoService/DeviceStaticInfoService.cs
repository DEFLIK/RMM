using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Rmm.Domain.DAL.Entities;
using Rmm.Domain.DAL.Interfaces;

namespace Rmm.Domain.Core.Services.DeviceStaticInfoService
{
    public class DeviceStaticInfoService : IDataService<DeviceStaticInfo>
    {
        private readonly IDbRepository _dbRepository;

        public DeviceStaticInfoService(IDbRepository dbRepository)
        {
            _dbRepository = dbRepository;
        }

        public async Task<Guid> Create(DeviceStaticInfo entity)
        {
            var id = await _dbRepository.Add(entity);
            await _dbRepository.SaveChangesAsync();
            return id;
        }

        public async Task<DeviceStaticInfo> Get(Guid id)
        {
            return await _dbRepository.Get<DeviceStaticInfo>(device => device.Id == id).FirstOrDefaultAsync() ?? new DeviceStaticInfo();
        }

        public async Task<DeviceStaticInfo[]> Get(Expression<Func<DeviceStaticInfo, bool>> selector)
        {
            return await _dbRepository.Get(selector).ToArrayAsync();
        }

        public async Task<DeviceStaticInfo[]> GetRange(int start, int count)
        {
            return await _dbRepository.GetRange<DeviceStaticInfo>(start, count).ToArrayAsync();
        }

        public async Task Update(DeviceStaticInfo entity)
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
