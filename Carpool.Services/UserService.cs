using Carpool.Contracts;
using Carpool.Concerns;
using System;

namespace Carpool.Services
{
    public class UserService : IUserService
    {
        private readonly DbService service;
        private readonly string tableName = "[dbo].[Person]";

        public UserService(DbService dbService)
        {
            service = dbService;
        }

        public APIResponse AddUser(string email, string password)
        {
            APIResponse response = new APIResponse();
            try
            {
                var user = new User()
                {
                    FirstName = "Temp",
                    LastName = "Temp",
                    Email = email,
                    Passkey = password,
                };
                response.Data = service.Add(tableName, user);
                response.IsSuccess = true;
            }
            catch (Exception e)
            {
                response.IsSuccess = false;
                response.Message = e.Message;
            }
            return response;
        }

        public APIResponse GetProfile(long id)
        {
            APIResponse response = new APIResponse();
            try
            {
                response.Data = service.GetUserInfo(id, tableName);
                response.IsSuccess = true;
            }catch(Exception e)
            {
                response.IsSuccess = false;
                response.Message = e.Message; ;
            }
            return response;
        }

        public APIResponse GetRides(long id, bool isBookedRides)
        {
            APIResponse response = new APIResponse();
            try
            {
                response.Data = service.GetRideInfo(null,id,isBookedRides);
                response.IsSuccess = true;
            }
            catch (Exception e)
            {
                response.IsSuccess = false;
                response.Message = e.Message;
            }
            return response;
        }

        public APIResponse GetUserIdIfPresent(string email, string password)
        {
            APIResponse response = new();
            try
            {
                response.Data = service.GetUserId(email, password, tableName);
                response.IsSuccess = true;
            }
            catch (Exception e)
            {
                response.IsSuccess = false;
                response.Message = e.Message;
            }
            return response;
        }

        public APIResponse UpdateName(long id, string firstName, string lastName)
        {
            APIResponse response = new();
            try
            {
                User user = new()
                {
                    Id = id,
                    FirstName = firstName,
                    LastName = lastName
                };
                service.Update(id, tableName, user);
                response.IsSuccess = true;
            }
            catch (Exception e)
            {
                response.IsSuccess = false;
                response.Message = e.Message;
            }
            return response;
        }
    }
}
