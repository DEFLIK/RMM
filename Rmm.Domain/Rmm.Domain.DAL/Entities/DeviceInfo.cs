using System;
using Rmm.Domain.DAL.Enums;

namespace Rmm.Domain.DAL.Entities
{
    public class DeviceInfo : BaseEntity
    {
        public string Name { get; set; }
        public DeviceStatus Status { get; set; }
        public string Os { get; set; }
        public double[] Coordinates { get; set; }
        public int RunTimeS { get; set; }
        public DateTime LastAnswerTime { get; set; }
    }
}
