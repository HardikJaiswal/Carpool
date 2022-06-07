using Microsoft.AspNetCore.Mvc;
using Carpool.Models;
using System.Collections.Generic;

namespace Carpool.IContracts
{
    public interface IUserService
    {
        APIResponse GetProfile(int id);

        APIResponse AddUser(string email, string password);

        APIResponse GetUserIdIfPresent(string email, string password);

        APIResponse GetRides(int id, bool isBooked);

        APIResponse UpdateName(int id, string firstName, string lastName);
    }
}