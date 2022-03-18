using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Entities;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace web_core.Services
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
            //var entity = _mapper.Map<LeadEntity>(lead);
            //entity.UserCreated = _currentUser.Id;

            //var result = await _dbRepository.Add(entity);
            //await _dbRepository.SaveChangesAsync();

            //return result;
            var id = await _dbRepository.Add(entity);
            await _dbRepository.SaveChangesAsync();
            return id;
        }

        public async Task<DeviceInfo> Get(Guid id)
        {
            var entity = await _dbRepository.Get<DeviceInfo>(device => device.Id == id).FirstOrDefaultAsync();
            return entity;
        }

        public async Task Update(DeviceInfo entity)
        {
            //var entity = _mapper.Map<LeadEntity>(lead);

            //await _dbRepository.Update(entity);
            //await _dbRepository.SaveChangesAsync();
        }

        public async Task Delete(Guid id)
        {
            //await _dbRepository.Delete<LeadEntity>(leadId);
            //await _dbRepository.SaveChangesAsync();
        }
    }
}
