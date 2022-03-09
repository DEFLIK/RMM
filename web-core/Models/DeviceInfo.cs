using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using web_core.Interfaces;

namespace web_core.Models
{
    public class DeviceInfo : IDocument
    {
        public string Name { get; set; }
        public DeviceStatus Status { get; set; }
        public string Os { get; set; }
        public double[] Coordinates { get; set; }
        public int RunTimeS { get; set; }

        public void ApplyData(List<string> arguments)
        {
            Name = arguments[1];
            Status = (DeviceStatus)int.Parse(arguments[2]);
            Os = arguments[3];
            Coordinates = new[] {double.Parse(arguments[4]), double.Parse(arguments[5])};
            RunTimeS = int.Parse(arguments[6]);
        }
    }

    public enum DeviceStatus
    {
        Enabled,
        Disabled,
        Sleep,
        Blocked
    }
}
