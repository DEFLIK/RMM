using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Entities;
using DAL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace web_core.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly IDbRepository _dbRepository;

        public AuthService(IDbRepository dbRepository)
        {
            _dbRepository = dbRepository;
        }

        /// <exception cref="KeyNotFoundException"></exception>
        /// /// <exception cref="ArgumentException"></exception>
        public async Task<User> OpenSessionAsync(string userName, string hash)
        {
            var user = _dbRepository.Get<User>(usr => usr.Name == userName).FirstOrDefault();
            if (user == null)
                throw new KeyNotFoundException();
            if (user.Hash != hash)
                throw new ArgumentException();

            user.IsSessionActive = true;
            await _dbRepository.Update(user);
            await _dbRepository.SaveChangesAsync();

            return user;
        }

        /// <exception cref="KeyNotFoundException"></exception>
        /// <exception cref="ArgumentException"></exception>
        public async Task<User> CloseSessionAsync(string userName, string hash)
        {
            var user = _dbRepository.Get<User>(usr => usr.Name == userName).FirstOrDefault();
            if (user == null)
                throw new KeyNotFoundException();
            if (user.Hash != hash)
                throw new ArgumentException();

            user.IsSessionActive = false;
            await _dbRepository.Update(user);
            await _dbRepository.SaveChangesAsync();

            return user;
        }

        /// <exception cref="ArgumentException"></exception>
        public async Task<User> RegisterNewUserAsync(string userName, string email, string hash)
        {
            var user = _dbRepository.Get<User>(usr => usr.Name == userName).FirstOrDefault();
            if (user != null)
                throw new ArgumentException();

            var newUser = new User
            {
                Name = userName,
                Email = email,
                Hash = hash
            };

            await _dbRepository.Add(newUser);
            await _dbRepository.SaveChangesAsync();

            return newUser;
        }
    }
}
