using Carpool.Contracts;
using Carpool.Concerns;
using System;
using RepoDb;
using RepoDb.Enumerations;

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

        public APIResponse BookRide(int rideId, int bookerId)
        {
            var where = new[]
            {
                new QueryField("Id", Operation.Equal, rideId)
            };
            APIResponse response = new();
            try
            {
                Ride ride = service.Get<Ride>(tableName, where);
                ride.PassengerId = bookerId;
                service.Update(tableName, ride);
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
            APIResponse response = new();
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
            APIResponse response = new();
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
