using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Rmm.Domain.Core.Models;
using Rmm.Domain.Core.Services.DeviceStateService;
using Rmm.Domain.DAL.Entities;

namespace Rmm.Domain.Core.Controllers
{
    [Route("api/device/state")]
    [ApiController]
    public class DeviceStateController : ControllerBase
    {
        private readonly IDeviceStateService _stateSerivce;
        public DeviceStateController(IDeviceStateService service)
        {
            _stateSerivce = service;
        }

        [HttpPut("set")]
        public async Task<ActionResult<Guid>> SetState([FromBody] DeviceState state)
        {
            await _stateSerivce.SetState(state);

            return Ok();
        }

        [HttpGet("get")]
        public async Task<ActionResult<DeviceState>> GetState(Guid id)
        {
            var device = await _stateSerivce.GetStateOrNull(id);

            if (device is null)
                return NotFound();

            return Ok(device);
        }
    }
}
