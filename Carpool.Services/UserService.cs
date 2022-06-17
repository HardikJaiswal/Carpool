using Carpool.Contracts;
using Carpool.Concerns;
using System;
using RepoDb;
using RepoDb.Enumerations;

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
            APIResponse response = new();
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

        public APIResponse GetProfile(int id)
        {
            var where = new[]
            {
                new QueryField("Id", Operation.Equal, id)
            };
            APIResponse response = new();
            try
            {
                response.Data = service.Get<User>(tableName,where);
                response.IsSuccess = true;
            }catch(Exception e)
            {
                response.IsSuccess = false;
                response.Message = e.Message; ;
            }
            return response;
        }

        public APIResponse GetRides(int id, bool isBookedRides)
        {
            APIResponse response = new();
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

        public APIResponse Login(string email, string password)
        {
            var where = new[]
            {
                new QueryField("Email", Operation.Equal, email),
                new QueryField("Passkey", Operation.Equal, password)
            };
            APIResponse response = new();
            try
            {
                response.Data = service.Get<User>(tableName,where).Id;
                response.IsSuccess = true;
            }
            catch (Exception e)
            {
                response.IsSuccess = false;
                response.Message = e.Message;
            }
            return response;
        }

        public APIResponse UpdateName(int id, string firstName, string lastName)
        {
            var where = new[]
            {
                new QueryField("Id", Operation.Equal, id)
            };
            APIResponse response = new();
            try
            {
                User user = service.Get<User>(tableName,where);
                user.FirstName = firstName;
                user.LastName = lastName;
                service.Update(tableName, user);
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
