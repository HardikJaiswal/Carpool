using Carpool.Contracts;
using Carpool.Concerns;
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
        public User GetProfile(long id)
        {
            var res = UserService.GetProfile(id);
            return res.IsSuccess ? res.Data : null;
        }

        [HttpPost("create")]
        public long AddUser(string email, string password)
        {
            var res = UserService.AddUser(email, password);
            return res.IsSuccess ? res.Data : 0;
        }

        [HttpGet("getuser")]
        public long GetUserIdIfPresent(string email, string password)
        {
            var res = UserService.GetUserIdIfPresent(email, password);
            return res.IsSuccess ? res.Data : 0;
        }

        [HttpGet("getBookedRides")]
        public IEnumerable<RideInfo> GetBookedRides(long id)
        {
            var res = UserService.GetRides(id, true);
            return res.IsSuccess ? res.Data : null;
        }

        [HttpGet("getOfferedRides")]
        public IEnumerable<RideInfo> GetOfferedRides(long id)
        {
            var res = UserService.GetRides(id, false);
            return res.IsSuccess ? res.Data : null;
        }

        [HttpPatch("updateNames")]
        public IActionResult UpdateName(long id, string firstName, string lastName)
        {
            return UserService.UpdateName(id, firstName, lastName).IsSuccess ? Ok() : BadRequest();
        }
    }
}
