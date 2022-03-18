using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using DAL.Entities;
using DAL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using web_core.Services;

namespace web_core.Controllers
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
        public async Task<string> GetDevice(Guid id)
        {
            return JsonConvert.SerializeObject(await _serivce.Get(id));
        }

        [HttpPost]
        public string AddRandom()
        {
            var rng = new Random();
            var device = new DeviceInfo()
            {
                Coordinates = new[] { rng.Next(0, 50) + rng.NextDouble(), rng.Next(0, 50) + rng.NextDouble() },
                Id = new Guid(),
                Os = "Windows",
                RunTimeS = rng.Next(0, 10000),
                Status = (DeviceStatus)rng.Next(0, 5)
            };
            device.Name = "pc-" + device.Id.ToString().Substring(0, 5);
            _serivce.Create(device);

            return JsonConvert.SerializeObject(device);
        }
    }
}
