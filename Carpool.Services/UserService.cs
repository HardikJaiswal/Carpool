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

        public APIResponse AddUser(string email, string password)
        {
            int res;
            try
            {
                var user = new User()
                {
                    FirstName = "Temp",
                    LastName = "Temp",
                    Email = email,
                    Passkey = password,
                    UserId = GenerateUserID()
                };
                res = user.UserId;
                _context.Person?.Add(user);
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                return new APIResponse { IsSuccess = false, Message = e.Message };
            }
            return new APIResponse { IsSuccess = true, Data =  res };
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

        public APIResponse GetProfile(int id)
        {
            User res;
            try
            {
                res = _context.Person?.FirstOrDefault(u => u.UserId == id);
            }catch(Exception e)
            {
                return new APIResponse { IsSuccess=false, Message = e.Message };
            }
            return new APIResponse { IsSuccess = true, Data = res };
        }

        public APIResponse GetRides(int id, bool isBookedRides)
        {
            dynamic res;
            try
            {
                if (isBookedRides)
                {
                    res = (from r in _context.RideBooked
                           join p in _context.Person on r.OwnerId equals p.UserId
                           where r.PassengerId == id
                           select new
                           {
                               r.StartLocation,
                               r.EndLocation,
                               r.Price,
                               r.BookingDate,
                               r.TimeSlot,
                               r.Seats,
                               p.FirstName,
                               p.LastName
                           }).ToList();
                }
                else
                {
                    res = (from r in _context.RideBooked
                           join p in _context.Person on r.OwnerId equals p.UserId
                           where r.OwnerId == id
                           select new
                           {
                               r.StartLocation,
                               r.EndLocation,
                               r.Price,
                               r.BookingDate,
                               r.TimeSlot,
                               r.Seats,
                               p.FirstName,
                               p.LastName
                           }).ToList();
                }
            }
            catch (Exception e)
            {
                return new APIResponse { IsSuccess = false, Message = e.Message };
            }
            return new APIResponse { IsSuccess = true, Data = res };
        }

        public APIResponse GetUserIdIfPresent(string email, string password)
        {
            int res;
            try
            {
                var person = _context.Person.FirstOrDefault(p => p.Email == email && p.Passkey == password);
                if (person == null) 
                    return new APIResponse { IsSuccess = false, Message = "Wrong ID or password" };
                else 
                    res = person.UserId;
            }
            catch(Exception e)
            {
                return new APIResponse { IsSuccess = false, Message = e.Message };
            }
            return new APIResponse { IsSuccess = true, Data = res };
        }

        public APIResponse UpdateName(int id, string firstName, string lastName)
        {
            //try
            //{
                var user = _context.Person.FirstOrDefault(p => p.UserId == id);
                user.FirstName = firstName;
                user.LastName = lastName;
                _context.SaveChanges();
            //}catch(Exception e)
            //{
            //    return new APIResponse() { IsSuccess = false, Message = e.Message };
            //}
            return new APIResponse() { IsSuccess = true };
        }
    }
}
