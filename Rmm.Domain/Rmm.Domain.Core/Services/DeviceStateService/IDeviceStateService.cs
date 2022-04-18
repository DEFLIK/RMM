using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Rmm.Domain.Core.Models;

namespace Rmm.Domain.Core.Services.DeviceStateService
{
    public interface IDeviceStateService
    {
        public Task<Guid> SetState(DeviceState entity);
        public Task<DeviceState> GetStateOrNull(Guid id);
    }
}
