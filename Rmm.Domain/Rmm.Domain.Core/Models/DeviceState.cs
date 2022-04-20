using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Rmm.Domain.DAL.Enums;

namespace Rmm.Domain.Core.Models
{
    public class DeviceState: IDevicePartialData
    {
        public Guid SourceDeviceId { get; set; }
        public DeviceStatus Status { get; set; }
        public int RunTimeS { get; set; }
        public double LastAnswerTime { get; set; }
    }
}
