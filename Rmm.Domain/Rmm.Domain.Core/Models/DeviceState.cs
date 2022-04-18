using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Rmm.Domain.DAL.Interfaces;
using System.Drawing;

namespace Rmm.Domain.Core.Models
{
    public class DeviceState : IDevicePartialData
    {
        public Guid SourceDeviceId { get; set; }

        public List<double>? CpuPerformanceGraph { get; set; }
        public List<string>? TerminalLog { get; set; }

    }
}
