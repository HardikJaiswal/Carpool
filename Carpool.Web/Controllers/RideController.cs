using Carpool.Contracts;
using Carpool.Concerns;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Carpool.Web.Controllers
{
    [Route("api/rideservice")]
    [ApiController]
    public class RidesController : ControllerBase
    {
        private readonly IRideService RideService;

        public RidesController([FromServices] IRideService rideService)
        {
            RideService = rideService;
        }

        [HttpGet("findride")]
        public List<RideInfo> FindRides(string startLocation, string endLocation, string bookingDate, int timeSlot)
        {
            AvailableRideRequest request = new()
            {
                StartLoaction = startLocation,
                EndLoaction = endLocation,
                BookingDate = bookingDate,
                TimeSlot = timeSlot
            };
            var res = RideService.GetAvailableRides(request);
            return res.IsSuccess ? res.Data : null;
        }

        [HttpPost("offerride")]
        public IActionResult OfferRide([FromBody] Ride ride)
        {
            var res = RideService.OfferRide(ride);
            return res.IsSuccess ? Ok() : BadRequest(res.Message);
        }

        [HttpPatch("bookride")]
        public IActionResult BookRide(long rideId, long bookerId)
        {
            var res = RideService.BookRide(rideId, bookerId);
            return res.IsSuccess ? Ok() : BadRequest(res.Message);
        }

    }
}
