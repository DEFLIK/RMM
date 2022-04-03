using System;
using System.IO;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Rmm.Domain.Core.Services.DeviceDataService;
using Rmm.Domain.DAL.Entities;

namespace Rmm.Domain.Core.Controllers
{
    [Route("api/device")]
    [ApiController]
    public class DeviceInfoController : ControllerBase
    {
        private readonly IDataService<DeviceInfo> _dataSerivce;
        public DeviceInfoController(IDataService<DeviceInfo> service)
        {
            _dataSerivce = service;
        }

        [HttpPut("add")]
        public async Task<ActionResult<Guid>> AddDevice()
        {
            var stream = Request.Body;
            var json = await new StreamReader(stream).ReadToEndAsync();

            DeviceInfo device;
            try
            {
                device = JsonConvert.DeserializeObject<DeviceInfo>(json);
            }
            catch
            {
                return BadRequest();
            }

            await _dataSerivce.Create(device);

            return Ok();
        }

        [HttpGet("get")]
        public async Task<ActionResult<DeviceInfo>> GetDevice(Guid id)
        {
            var device = await _dataSerivce.Get(id);

            if (device is null)
                return NotFound();

            return Ok(device);
        }

        [HttpGet("getRange")]
        public async Task<ActionResult<DeviceInfo[]>> GetRangeDevice(int start, int count)
        {
            var devices = await _dataSerivce.GetRange(start, count);

            if (!devices.Any())
                return NotFound();

            return Ok(devices);
        }


        [HttpDelete("delete")]
        public async Task<ActionResult> DeleteDevice(Guid id)
        {
            await _dataSerivce.Delete(id);

            return Ok();
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdateDevice()
        {
            var stream = Request.Body;
            var json = await new StreamReader(stream).ReadToEndAsync();

            DeviceInfo device;
            try
            {
                device = JsonConvert.DeserializeObject<DeviceInfo>(json);
            }
            catch
            {
                return BadRequest();
            }

            await _dataSerivce.Update(device);

            return Ok();
        }
    }
}
