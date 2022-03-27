using System;
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
        private readonly IDataService<DeviceInfo> _serivce;
        public DeviceInfoController(IDataService<DeviceInfo> service)
        {
            _serivce = service;
        }

        [HttpGet]
        public async Task<ActionResult<string>> GetDevice(Guid id)
        {
            return Ok(JsonConvert.SerializeObject(await _serivce.Get(id)));
        }

        //[HttpPost]
        //public ActionResult<string> AddRandom()
        //{
        //    var rng = new Random();
        //    var device = new DeviceInfo()
        //    {
        //        Coordinates = new[] { rng.Next(0, 50) + rng.NextDouble(), rng.Next(0, 50) + rng.NextDouble() },
        //        Id = new Guid(),
        //        Os = "Windows",
        //        RunTimeS = rng.Next(0, 10000),
        //        Status = (DeviceStatus)rng.Next(0, 5)
        //    };
        //    device.Name = "pc-" + device.Id.ToString().Substring(0, 5);
        //    _serivce.Create(device);

        //    return Ok(JsonConvert.SerializeObject(device));
        //}
    }
}
