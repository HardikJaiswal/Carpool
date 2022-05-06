using Microsoft.AspNetCore.Mvc;
using Carpool.Models;

namespace Carpool.IContracts
{
    public interface IUserService
    {
        JsonResult GetProfile(int id);

        IActionResult AddUser(string email, string password);

        int GetUserIdIfPresent(string email, string password);

        JsonResult GetRides(int id, bool isBooked);
    }
}