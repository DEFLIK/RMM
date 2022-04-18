using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Rmm.Domain.Core.Models;

namespace Rmm.Domain.Core.Services.DeviceStateService
{
    public class DeviceStateService : IDeviceStateService
    {
        private readonly Dictionary<Guid, DeviceState> _connectedDevicesState = new Dictionary<Guid, DeviceState>();

        public Task<DeviceState> GetStateOrNull(Guid id)
        {
            return Task.Run(() =>
            {
                _connectedDevicesState.TryGetValue(id, out var device);
                return device!;
            });
        }

        public Task<Guid> SetState(DeviceState entity)
        {
            return Task.Run(() =>
            {
                _connectedDevicesState[entity.SourceDeviceId] = entity;
                return entity.SourceDeviceId;
            });
        }
    }
}
