using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Interfaces;

namespace DAL.Entities
{
    public class DeviceInfo : BaseEntity
    {
        public string Name { get; set; }
        public DeviceStatus Status { get; set; }
        public string Os { get; set; }
        public double[] Coordinates { get; set; }
        public int RunTimeS { get; set; }
    }
}
