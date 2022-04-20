using System;
using Rmm.Domain.DAL.Enums;

namespace Rmm.Domain.DAL.Entities
{
    public class DeviceStaticInfo : BaseEntity
    {
        public string Name { get; set; }
        public string Os { get; set; }
        public double[] Coordinates { get; set; }
    }
}
