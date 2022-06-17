using Carpool.Contracts;
using Carpool.Concerns;
using System;

namespace Carpool.Services
{
    public class RideService : IRideService
    {
        private readonly DbService dbservice;
        private readonly string tableName = "[dbo].[RideBooked]";
        private string selectRideInfoQuery = "SELECT r.Source, r.Destination, r.Id, r.Price, r.AvailableSeats, r.BookingDate, " +
            "CONCAT(p.FirstName,' ',p.LastName) as OfferedBy " +
            "FROM dbo.RideBooked r inner join dbo.Person p on r.OwnerId = p.Id ";
        
        public RideService(DbService DbService)
        {
            dbservice = DbService;
        }

        public APIResponse BookRide(int rideId, int bookerId)
        {
            var queryParam = new
            {
                id = rideId,
                PassengerId = bookerId
            };
            string updatePassengerQuery = $"UPDATE {tableName} SET PassengerId = @PassengerId WHERE Id = @Id";
            APIResponse response = new();
            try
            {
                dbservice.Update(updatePassengerQuery, queryParam);
                response.IsSuccess = true;
            }
            catch(Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public APIResponse GetRideHistory(int id, bool isBookedRides)
        {
            object queryParam = new
            {
                Id = id
            };
            string whereClause = isBookedRides ? "WHERE r.PassengerId = @Id" : "WHERE r.OwnerId = @Id";
            APIResponse response = new();
            try
            {
                response.Data = dbservice.ExecuteQuery<RideInfo>(selectRideInfoQuery + whereClause, queryParam);
                response.IsSuccess = true;
            }
            catch (Exception e)
            {
                response.IsSuccess = false;
                response.Message = e.Message;
            }
            return response;
        }

        public APIResponse GetAvailableRides(AvailableRideRequest request)
        {
            string whereClause = "WHERE r.Source = @StartLocation AND r.Destination= @EndLocation " +
                        "AND r.BookingDate = @BookingDate AND r.PassengerId = 0 ";
            object queryParam = new
            {
                StartLocation = request.Source,
                EndLocation = request.Destination,
                BookingDate = request.Date
            };
            APIResponse response = new();
            try
            {
                response.Data = dbservice.ExecuteQuery<RideInfo>(selectRideInfoQuery + whereClause, queryParam);
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
                dbservice.Add(tableName, ride);
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
