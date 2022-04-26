using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Timers;
using Microsoft.Extensions.DependencyInjection;
using Rmm.Domain.Core.Models;
using Rmm.Domain.Core.Services.DeviceStateService;
using Rmm.Domain.DAL.Entities;

namespace Rmm.Domain.Core.Services.DeviceSystemLogsService
{
    public class DeviceSystemLogsService : IDeviceSystemLogsService
    {
        private readonly Dictionary<Guid, DeviceSystemLogs> _connectedDevicesLogs = new Dictionary<Guid, DeviceSystemLogs>();
        private readonly Timer _stateUpdater;

        // Заглушка - эмитатор работы девайсов
        public DeviceSystemLogsService(IServiceScopeFactory scopeFactory)
        {
            var rng = new Random();
            IDataService<DeviceStaticInfo> deviceInfoService;
            using (var scope = scopeFactory.CreateScope())
            {
                deviceInfoService = scope.ServiceProvider.GetRequiredService<IDataService<DeviceStaticInfo>>();
                foreach (var device in deviceInfoService.GetRange(0, int.MaxValue).Result)
                {
                    _connectedDevicesLogs[device.Id] = new DeviceSystemLogs()
                    {
                        CpuPerformanceGraph = new Queue<double>(),
                        SourceDeviceId = device.Id,
                        TerminalLog = new List<string>() { "testlog1", "testlog2" }
                    };
                }
            }

            var timer = new Timer(2000);
            timer.Elapsed += (source, e) =>
            {
                foreach (var deviceState in _connectedDevicesLogs)
                {
                    if (deviceState.Value.CpuPerformanceGraph?.Count > 10)
                        deviceState.Value.CpuPerformanceGraph?.Dequeue();
                    deviceState.Value.CpuPerformanceGraph?.Enqueue(rng.Next(100) + rng.NextDouble());
                }
            };
            timer.Start();
            _stateUpdater = timer;
            Console.WriteLine("Device system logs emulation started...");
        }

        public Task<DeviceSystemLogs> GetLogsOrNull(Guid id)
        {
            return Task.Run(() =>
            {
                _connectedDevicesLogs.TryGetValue(id, out var device);
                return device!;
            });
        }

        public Task<Guid> SetLogs(DeviceSystemLogs entity)
        {
            return Task.Run(() =>
            {
                _connectedDevicesLogs[entity.SourceDeviceId] = entity;
                return entity.SourceDeviceId;
            });
        }
    }
}
