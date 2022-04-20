using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Timers;
using Microsoft.Extensions.DependencyInjection;
using Rmm.Domain.Core.Models;
using Rmm.Domain.DAL.Entities;
using Rmm.Domain.DAL.Enums;

namespace Rmm.Domain.Core.Services.DeviceStateService
{
    public class DeviceStateService : IDeviceStateService
    {
        private readonly Dictionary<Guid, DeviceState> _connectedDevicesState = new Dictionary<Guid, DeviceState>();
        private Timer _stateUpdater;

        public DeviceStateService(IServiceScopeFactory scopeFactory)
        {
            var rng = new Random();
            IDataService<DeviceStaticInfo> deviceInfoService;
            using (var scope = scopeFactory.CreateScope())
            {
                deviceInfoService = scope.ServiceProvider.GetRequiredService<IDataService<DeviceStaticInfo>>();
                foreach (var device in deviceInfoService.GetRange(0, int.MaxValue).Result)
                {
                    _connectedDevicesState[device.Id] = new DeviceState()
                    {
                        SourceDeviceId = device.Id,
                        LastAnswerTime = 0.0,
                        RunTimeS = 0,
                        Status = (DeviceStatus)rng.Next(0, 4)
                    };
                }
            }

            var timer = new Timer(2000);
            timer.Elapsed += (source, e) =>
            {
                foreach (var deviceState in _connectedDevicesState.Where(device => device.Value.Status == DeviceStatus.Enabled))
                {
                    deviceState.Value.RunTimeS += 2;
                }

                foreach (var deviceState in _connectedDevicesState.Where(device => device.Value.Status != DeviceStatus.Enabled))
                {
                    deviceState.Value.LastAnswerTime += 2;
                }
            };
            timer.Start();
            _stateUpdater = timer;
            Console.WriteLine("TIMER STARTED!!!!!!!!!!!!!!!!!!!!");
        }

        public Task<DeviceState> GetStateOrNull(Guid id)
        {
            #nullable disable
            return Task.Run(() =>
            {
                _connectedDevicesState.TryGetValue(id, out var res);
                return res;
            });
            #nullable restore
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
