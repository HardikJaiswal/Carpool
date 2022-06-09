using Carpool.Concerns;

namespace Carpool.Contracts
{
    public interface IRideService
    {
        APIResponse GetAvailableRides(AvailableRideRequest request);

        APIResponse BookRide(long rideId, long bookerId);

        APIResponse OfferRide(Ride ride);
    }
}
