using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace Rmm.Domain.Core.Services.DeviceScreenService
{
    public class DeviceScreenService: IDeviceScreenService
    {
        public Dictionary<Guid, byte[]> ScreenImages = new Dictionary<Guid, byte[]>();

        public DeviceScreenService()
        {
            var converter = new ImageConverter();
            ScreenImages[Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa6")] = converter.ConvertTo(Image.FromFile("./test.png"), typeof(byte[])) as byte[] ?? new byte[] {};
        }

        public Task SetDeviceScreenImage(Guid deviceId, byte[] image)
        {
            return Task.Run(() => ScreenImages[deviceId] = image);
        }

        public Task<byte[]> GetScreenImageOrNull(Guid deviceId)
        {
            return Task.Run(() =>
            {
                ScreenImages.TryGetValue(deviceId, out var image);
                return image!;
            });
        }
    }
}
