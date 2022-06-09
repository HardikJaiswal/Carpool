using Carpool.Contracts;
using Carpool.Concerns;
using System;

namespace Carpool.Services
{
    public class RideService : IRideService
    {
        private readonly DbService service;
        private readonly string tableName = "[dbo].[RideBooked]";

        public RideService(DbService DbService)
        {
            service = DbService;
        }

        public APIResponse BookRide(long rideId, long bookerId)
        {
            APIResponse response = new();
            try
            {
                Ride ride = new()
                {
                    PassengerId = bookerId,
                    Id = rideId
                };
                service.Update(rideId, tableName, ride);
                response.IsSuccess = true;
            }
            catch(Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public APIResponse GetAvailableRides(AvailableRideRequest request)
        {
            APIResponse response = new APIResponse();
            try
            {
                response.Data = service.GetRideInfo(request);
                response.IsSuccess = true;
            }
            catch (Exception e)
            {
                response.IsSuccess = false;
                response.Message = e.Message;
            }
            return response;
        }

        public APIResponse OfferRide(Ride ride)
        {
            APIResponse response = new APIResponse();
            try
            {
                ride.PassengerId = 0;
                service.Add(tableName, ride);
                response.IsSuccess = true;
            }catch(Exception e)
            {
                response.IsSuccess = false;
                response.Message = e.Message;
            }
            return response;
        }
    }
}
