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
        public Task<User> OpenSessionAsync(string userName, string hash);
        public Task<User> CloseSessionAsync(string userName, string hash);
        public Task<User> RegisterNewUserAsync(string userName, string email, string hash);
    }
}
