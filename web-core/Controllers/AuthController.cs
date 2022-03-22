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
                var session = await _serivce.OpenSessionAsync(userName, hash);
                return Ok(GetSessionJson(session));
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
        public async Task<ActionResult<string>> CloseSessionAsync(string token)
        {
            try
            {
                await _serivce.CloseSessionAsync(token);
                return Ok();
            }
            catch (Exception e)
            {
                switch (e)
                {
                    case KeyNotFoundException _:
                        return NotFound("There is no such active session");
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
                await _serivce.RegisterNewUserAsync(userName, email, hash);
                return Ok();
            }
            catch (ArgumentException)
            {
                return BadRequest($"Unable to register new user: '{userName}'");
            }
        }

        [HttpGet("isSessionOpen")]
        public async Task<ActionResult<bool>> IsSessionOpen(string token)
        {
            //var token = Request.Headers["authorization"].ToString();
            return await _serivce.IsSessionOpenAsync(token);
        }

        private static string GetSessionJson(Session session) =>
            $"{{\"token\": \"{session.Token}\", \"expireAt\": \"{session.ExpireAt}\"}}";
    }
}
