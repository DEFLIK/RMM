using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace Rmm.Domain.Core.Services.DeviceScreenService
{
    public interface IDeviceScreenService
    {
        public Task SetDeviceScreenImage(Guid deviceId, byte[] image);
        public Task<byte[]> GetScreenImageOrNull(Guid deviceId);
    }
}
