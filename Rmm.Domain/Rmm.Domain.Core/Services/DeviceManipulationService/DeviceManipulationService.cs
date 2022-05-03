using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Timers;
using Microsoft.Extensions.DependencyInjection;
using Rmm.Domain.Core.Models;
using Rmm.Domain.Core.Services.DeviceSystemLogsService;
using Rmm.Domain.DAL.Entities;
using Rmm.Domain.DAL.Enums;

namespace Rmm.Domain.Core.Services.DeviceManipulationService
{
    public class DeviceManipulationService: IDeviceManiupalationService
    {
        private IDeviceSystemLogsService _deviceSystemLogsService;

        // Обертка для эмуляции выполнения команд
        public DeviceManipulationService(IServiceScopeFactory scopeFactory)
        {
            using var scope = scopeFactory.CreateScope();
            _deviceSystemLogsService = scope.ServiceProvider.GetRequiredService<IDeviceSystemLogsService>();
        }

        public async Task<List<string>> Execute(Guid id, string command)
        {
            await _deviceSystemLogsService.AddTerminalLog(id, $"Command to execute: '{command}'");
            return (await _deviceSystemLogsService.GetLogsOrNull(id)).TerminalLog ?? new();
        }
    }
}
