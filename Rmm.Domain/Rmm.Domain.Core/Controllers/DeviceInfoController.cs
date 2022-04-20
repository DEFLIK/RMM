using System;
using System.IO;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Rmm.Domain.Core.Services;
using Rmm.Domain.DAL.Entities;

namespace Rmm.Domain.Core.Controllers
{
    [Route("api/device/info")]
    [ApiController]
    public class DeviceInfoController : ControllerBase
    {
        private readonly IDataService<DeviceStaticInfo> _dataSerivce;
        public DeviceInfoController(IDataService<DeviceStaticInfo> service)
        {
            _dataSerivce = service;
        }

        [HttpPut("add")]
        public async Task<ActionResult<Guid>> AddDevice()
        {
            var stream = Request.Body;
            var json = await new StreamReader(stream).ReadToEndAsync();

            DeviceStaticInfo deviceStatic;
            try
            {
                deviceStatic = JsonConvert.DeserializeObject<DeviceStaticInfo>(json) ?? new DeviceStaticInfo();
            }
            catch
            {
                return BadRequest();
            }

            await _dataSerivce.Create(deviceStatic);

            return Ok();
        }

        [HttpGet("get")]
        public async Task<ActionResult<DeviceStaticInfo>> GetDevice(Guid id)
        {
            var device = await _dataSerivce.Get(id);

            if (device is null)
                return NotFound();

            return Ok(device);
        }

        [HttpGet("getRange")]
        public async Task<ActionResult<DeviceStaticInfo[]>> GetRangeDevice(int start, int count)
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

            DeviceStaticInfo deviceStatic;
            try
            {
                deviceStatic = JsonConvert.DeserializeObject<DeviceStaticInfo>(json) ?? new DeviceStaticInfo();
            }
            catch
            {
                return BadRequest();
            }

            await _dataSerivce.Update(deviceStatic);

            return Ok();
        }
    }
}
