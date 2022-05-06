using Carpool.IContracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserServiceController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserServiceController([FromServices] IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("getprofile")]
        public JsonResult GetProfile(int id)
        {
            return _userService.GetProfile(id);
        }

        [HttpPost("create")]
        public IActionResult AddUser(string email, string password)
        {
            return _userService.AddUser(email, password);
        }

        [HttpGet("getuser")]
        public JsonResult GetUserIdIfPresent(string email, string password)
        {
            int id = _userService.GetUserIdIfPresent(email, password);
            return id == 0 ? new JsonResult(null) : new JsonResult(id);
        }

        [HttpGet("getBookedRides")]
        public JsonResult GetBookedRides(int id)
        {
            return _userService.GetRides(id, true);
        }

        [HttpGet("getOfferedRides")]
        public JsonResult GetOfferedRides(int id)
        {
            return _userService.GetRides(id, false);
        }
    }
}
