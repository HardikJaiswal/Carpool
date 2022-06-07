using Carpool.IContracts;
using Carpool.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Carpool.Web.Controllers
{
    [Route("api/rideservice")]
    [ApiController]
    public class RidesController : ControllerBase
    {
        private readonly IRideService RideService;

        public RidesController([FromServices] IRideService rideService)
        {
            this.RideService = rideService;
        }

        [HttpGet("findride")]
        public dynamic FindRides(string startLocation, string endLocation, string bookingDate, int timeSlot)
        {
            var res = RideService.GetAvailableRides(startLocation, endLocation, bookingDate, timeSlot);
            return res.IsSuccess ? res.Data : null;
        }

        [HttpPost("offerride")]
        public IActionResult OfferRide(int OwnerId, string StartLocation, string EndLocation, string BookingDate,
            int TimeSlot, int Seats, int Price)
        {
            var res = RideService.OfferRide(OwnerId,StartLocation,EndLocation,BookingDate,TimeSlot,Seats,Price);
            return res.IsSuccess ? Ok() : BadRequest(res.Message);
        }

        [HttpPatch("bookride")]
        public IActionResult BookRide(int rideId, int bookerId)
        {
            var res = RideService.BookRide(rideId, bookerId);
            return res.IsSuccess ? Ok() : BadRequest(res.Message);
        }

    }
}
