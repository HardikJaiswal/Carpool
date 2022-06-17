using Carpool.Contracts;
using Carpool.Concerns;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.Web.Controllers
{
    [Route("api/rideservice")]
    [ApiController]
    public class RidesController : ControllerBase
    {
        private readonly IRideService RideService;
        private readonly Provider Provider;

        public RidesController([FromServices] IRideService rideService)
        {
            RideService = rideService;
            Provider = new Provider();
        }

        [HttpGet("findride")]
        public APIResponse FindRides(string startLocation, string endLocation, string bookingDate, int timeSlot)
        {
            var request = Provider.CreateAvailableRideRequest(startLocation, endLocation, bookingDate, timeSlot);
            var res = RideService.GetAvailableRides(request);
            return res;
        }

        [HttpPost("offerride")]
        public APIResponse OfferRide([FromBody]OfferrideRequest request)
        {
            var ride = Provider.GetConfiguredRide(request);
            var res = RideService.OfferRide(ride);
            return res;
        }

        [HttpGet("getbookedridesofuser")]
        public APIResponse GetBookedRides(int id)
        {
            var res = RideService.GetRideHistory(id, true);
            return res;
        }

        [HttpGet("getofferedridesofuser")]
        public APIResponse GetOfferedRides(int id)
        {
            var res = RideService.GetRideHistory(id, false);
            return res;
        }

        [HttpPatch("bookride")]
        public APIResponse BookRide(int rideId, int bookerId)
        {
            var res = RideService.BookRide(rideId, bookerId);
            return res;
        }
    }
}
