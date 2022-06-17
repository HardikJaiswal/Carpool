using Carpool.Contracts;
using Carpool.Concerns;
using Microsoft.AspNetCore.Mvc;

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
        public APIResponse GetProfile(int id)
        {
            var res = UserService.GetProfile(id);
            return res;
        }

        [HttpPost("create")]
        public APIResponse AddUser(string email, string password)
        {
            var res = UserService.AddUser(email, password);
            return res;
        }

        [HttpGet("getuser")]
        public APIResponse GetUserIdIfPresent(string email, string password)
        {
            var res = UserService.Login(email, password);
            return res;
        }

        [HttpPatch("updatenames")]
        public APIResponse UpdateName(int id, string firstName, string lastName)
        {
            return UserService.UpdateName(id, firstName, lastName);
        }
    }
}
