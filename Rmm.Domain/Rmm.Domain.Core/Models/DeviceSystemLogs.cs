using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Rmm.Domain.DAL.Interfaces;
using System.Drawing;
using Rmm.Domain.DAL.Enums;

namespace Rmm.Domain.Core.Models
{
    public class DeviceSystemLogs : IDevicePartialData
    {
        public Guid SourceDeviceId { get; set; }

        public Queue<double>? CpuPerformanceGraph { get; set; }
        public List<string>? TerminalLog { get; set; }
    }
}
