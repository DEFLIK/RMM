using System;

namespace Rmm.Domain.Core.Models
{
    public interface IDevicePartialData
    {
        public Guid SourceDeviceId { get; set; }
    }
}
