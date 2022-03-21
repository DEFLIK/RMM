using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using web_core.Services;
using web_core.Services.AuthService;

namespace web_core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _serivce;
        public AuthController(IAuthService service)
        {
            _serivce = service;
        }

        [HttpGet("openSession")]
        public async Task<ActionResult<string>> OpenSessionAsync(string userName, string hash)
        {
            try
            {
                var user = await _serivce.OpenSessionAsync(userName, hash);
                return Ok(GetUserSessionJson(user));
            }
            catch (Exception e)
            {
                switch (e)
                {
                    case KeyNotFoundException _:
                        return NotFound($"There is no registred user with name = '{userName}'");
                    case ArgumentException _:
                        return BadRequest("Wrong password");
                    default:
                        throw;
                }
            }
        }

        [HttpGet("closeSession")]
        public async Task<ActionResult<string>> CloseSessionAsync(string userName, string hash)
        {
            try
            {
                var user = await _serivce.CloseSessionAsync(userName, hash);
                return Ok(GetUserSessionJson(user));
            }
            catch (Exception e)
            {
                switch (e)
                {
                    case KeyNotFoundException _:
                        return NotFound($"There is no registred user with name = '{userName}'");
                    case ArgumentException _:
                        return BadRequest("Wrong password");
                    default:
                        throw;
                }
            }
        }

        [HttpGet("registerNewUser")]
        public async Task<ActionResult<string>> RegisterNewUserAsync(string userName, string email, string hash)
        {
            try
            {
                var user = await _serivce.RegisterNewUserAsync(userName, email, hash);
                return Ok(GetUserSessionJson(user));
            }
            catch (ArgumentException)
            {
                return BadRequest($"Unable to register new user: '{userName}'");
            }
        }

        private static string GetUserSessionJson(User user) =>
            $"{{\"name\": \"{user.Name}\", \"hash\": \"{user.Hash}\"}}";
    }
}
