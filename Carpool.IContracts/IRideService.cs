using Carpool.Concerns;

namespace Carpool.Contracts
{
    public interface IRideService
    {
        APIResponse GetAvailableRides(AvailableRideRequest request);

        APIResponse BookRide(int rideId, int bookerId);

        APIResponse OfferRide(Ride ride);
    }
}
