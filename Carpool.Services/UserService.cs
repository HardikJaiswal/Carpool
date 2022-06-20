using Carpool.Contracts;
using Carpool.Concerns;
using System;
using RepoDb;
using RepoDb.Enumerations;

namespace Carpool.Services
{
    public class UserService : IUserService
    {
        private readonly DbService dbservice;
        private readonly string tableName = "[dbo].[Person]";

        public UserService(DbService DbService)
        {
            dbservice = DbService;
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
                response.Data = dbservice.Add(tableName, user);
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
                response.Data = dbservice.Get<User>(tableName,where);
                response.IsSuccess = true;
            }catch(Exception e)
            {
                response.IsSuccess = false;
                response.Message = e.Message; ;
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
                response.Data = dbservice.Get<User>(tableName,where);
                if (response.Data != null) response.Data = response.Data.Id;
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
            APIResponse response = new();
            var queryParam = new
            {
                FirstName = firstName,
                LastName = lastName,
                Id = id
            };
            string updateNameQuery = $"UPDATE {tableName} SET FirstName=@FirstName, LastName=@lastName" +
            "WHERE Id=@Id";
            try
            {
                dbservice.Update(updateNameQuery, queryParam);
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
