using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Interfaces;

namespace DAL.Entities
{
    public class DeviceInfo : IEntity
    {
        public Guid Id { get; set; } = new Guid();
        public bool IsActive { get; set; } = true;
        public string Name { get; set; }
        public DeviceStatus Status { get; set; }
        public string Os { get; set; }
        public double[] Coordinates { get; set; }
        public int RunTimeS { get; set; }
    }
}
