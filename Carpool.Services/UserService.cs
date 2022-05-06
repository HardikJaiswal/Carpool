using Carpool.IContracts;
using Carpool.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Carpool.Services
{
    public class UserService : IUserService
    {
        private readonly ServiceContext _context;

        public UserService(ServiceContext serviceContext)
        {
            _context = serviceContext;
        }

        public IActionResult AddUser(string email, string password)
        {
            var user = new User()
            {
                FirstName = "Temp",
                LastName = "Temp",
                Email = email,
                Passkey = password,
                UserId = GenerateUserID()
            };
            _context.Person?.Add(user);
            _context.SaveChanges();
            return new OkResult();
        }

        private bool IsUserIdPresent(int id)
        {
            return _context.Person?.FirstOrDefault(u => u.UserId == id) != null;
        }

        private int GenerateUserID()
        {
            var random = new Random();
            int newId = random.Next(100);
            while (IsUserIdPresent(newId))
                newId = random.Next(100);
            return newId;
        }

        public JsonResult GetProfile(int id)
        {
            var user = _context.Person?.FirstOrDefault(u => u.UserId == id);
            return new JsonResult(user);
        }

        public JsonResult GetRides(int id, bool isBooked)
        {
            if (isBooked)
            {
                return new JsonResult(_context.Rides?.Where(r => r.PassengerId == id).ToList());
            }
            else
            {
                return new JsonResult(_context.Rides?.Where(r => r.OwnerId == id).ToList());
            }
        }

        public int GetUserIdIfPresent(string email, string password)
        {
            var user = _context.Person?.FirstOrDefault(p => p.Email == email && p.Passkey == password);
            return user != null ? user.UserId : 0;
        }
    }
}
