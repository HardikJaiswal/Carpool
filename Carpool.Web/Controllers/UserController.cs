using Carpool.IContracts;
using Carpool.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Carpool.Web.Controllers
{
    
    [ApiController]
    [Route("api/userservice")]
    public class UserController : ControllerBase
    {
        private readonly IUserService UserService;

        public UserController([FromServices] IUserService userService)
        {
            UserService = userService;
        }

        [HttpGet("getprofile")]
        public User GetProfile(int id)
        {
            var res = UserService.GetProfile(id);
            return res.IsSuccess ? res.Data : null;
        }

        [HttpPost("create")]
        public int AddUser(string email, string password)
        {
            var res = UserService.AddUser(email, password);
            return res.IsSuccess ? res.Data : 0;
        }

        [HttpGet("getuser")]
        public int GetUserIdIfPresent(string email, string password)
        {
            var res = UserService.GetUserIdIfPresent(email, password);
            return res.IsSuccess ? res.Data : 0;
        }

        [HttpGet("getBookedRides")]
        public dynamic GetBookedRides(int id)
        {
            var res = UserService.GetRides(id, true);
            return res.IsSuccess ? res.Data : null;
        }

        [HttpGet("getOfferedRides")]
        public dynamic GetOfferedRides(int id)
        {
            var res = UserService.GetRides(id, false);
            return res.IsSuccess ? res.Data : null;
        }

        [HttpPatch("updateNames")]
        public IActionResult UpdateName(int Id, string FirstName, string LastName)
        {
            return UserService.UpdateName(Id, FirstName, LastName).IsSuccess ? Ok() : BadRequest();
        }
    }
}
