using Carpool.IContracts;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RidesController : ControllerBase
    {
        private readonly IRideService _rideService;

        public RidesController([FromServices] IRideService rideService)
        {
            _rideService = rideService;
        }

        [HttpGet("findride")]
        public JsonResult FindRides(string source, string destination, string date, int timeSlot)
        {
            return new JsonResult(null);
        }

        [HttpPost("offerride")]
        public IActionResult OfferRide(int id, string startPoint, string endPoint, string date, int timeslot,
             int price, int seats)
        {
            return _rideService.OfferRide(id, startPoint, endPoint, date, timeslot, price, seats);
        }

        [HttpPatch("bookride")]
        public IActionResult BookRide(int rideId, int bookerId)
        {
            return _rideService.BookRide(rideId, bookerId);
        }

    }
}
