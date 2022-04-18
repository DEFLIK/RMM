using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rmm.Domain.Core.Models;
using Rmm.Domain.Core.Services.DeviceScreenService;

namespace Rmm.Domain.Core.Controllers
{
    [Route("api/device/screen")]
    [ApiController]
    public class DeviceScreenController : ControllerBase
    {
        private readonly IDeviceScreenService _screenSerivce;
        public DeviceScreenController(IDeviceScreenService service)
        {
            _screenSerivce = service;
        }

        [HttpPut("set")]
        public async Task<ActionResult> SetScreen(Guid deviceId, [FromBody] DeviceScreen image)
        {
            byte[] conv;
            try
            {
                conv = Convert.FromBase64String(image.Base64ScreenFrame);
            }
            catch (FormatException e)
            {
                return BadRequest(e.Message);
            }

            await _screenSerivce.SetDeviceScreenImage(deviceId, conv);

            return Ok();
        }

        [HttpGet("get")]
        [Produces("image/png")]
        public async Task<ActionResult<byte[]>> GetScreen(Guid deviceId)
        {
            var image = await _screenSerivce.GetScreenImageOrNull(deviceId);

            if (image is not null)
                return File(image, "image/png");

            return NotFound();
        }
    }
}
