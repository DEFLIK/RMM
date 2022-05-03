using System;
using System.Threading.Tasks;
using Rmm.Domain.Core.Models;

namespace Rmm.Domain.Core.Services.DeviceSystemLogsService
{
    public interface IDeviceSystemLogsService
    {
        public Task<Guid> SetLogs(DeviceSystemLogs entity);
        public Task AddTerminalLog(Guid id, string terminalLog);
        public Task<DeviceSystemLogs> GetLogsOrNull(Guid id);
    }
}
