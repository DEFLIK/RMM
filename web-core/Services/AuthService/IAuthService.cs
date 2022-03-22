using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Entities;
using DAL.Interfaces;

namespace web_core.Services.AuthService
{
    public interface IAuthService
    {
        public Task<Session> OpenSessionAsync(string userName, string hash);
        public Task CloseSessionAsync(string token);
        public Task RegisterNewUserAsync(string userName, string email, string hash);
        public Task<bool> IsSessionOpenAsync(string token);
    }
}
