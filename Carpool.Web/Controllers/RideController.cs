using Carpool.Contracts;
using Carpool.Concerns;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;

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
            DateTime date = getDate(bookingDate, getTimeFromSlot(timeSlot));
            AvailableRideRequest request = new()
            {
                Source = startLocation,
                Destination = endLocation,
                Date = date
            };
            var res = RideService.GetAvailableRides(request);
            return res.IsSuccess ? res.Data : null;
        }

        [HttpPost("offerride")]
        public IActionResult OfferRide([FromBody]OfferrideRequest request)
        {
            Ride ride = request.RideObject;
            DateTime date = getDate(request.Date,getTimeFromSlot(request.TimeSlot));
            ride.BookingDate = date;
            var res = RideService.OfferRide(ride);
            return res.IsSuccess ? Ok() : BadRequest(res.Message);
        }

        [HttpPatch("bookride")]
        public IActionResult BookRide(int rideId, int bookerId)
        {
            var res = RideService.BookRide(rideId, bookerId);
            return res.IsSuccess ? Ok() : BadRequest(res.Message);
        }

        private string getTimeFromSlot(int slot)
        {
            return slot switch
            {
                0 => "06:00 AM",
                1 => "10:00 AM",
                2 => "01:00 PM",
                3 => "04:00 PM",
                4 => "07:00 PM",
                _ => "",
            };
        }

        private DateTime getDate(string bookingDate, string time)
        {
            int year = int.Parse(bookingDate[..4]),
                month = int.Parse(bookingDate.Substring(5, 2)),
                day = int.Parse(bookingDate.Substring(8, 2)),
                hour = int.Parse(time[..2]);
            if (time.Substring(6, 2) == "PM") hour += 12;

            return new(year, month, day, hour, 0, 0);
        }
    }
}
