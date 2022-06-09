using Carpool.Concerns;
using Microsoft.Data.SqlClient;
using RepoDb;
using RepoDb.Enumerations;
using System.Collections.Generic;
using System.Linq;

namespace Carpool.Services
{
    public class DbService
    {
        private readonly string connectionString;

        public DbService(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public long Add(string tableName, object entity)
        {
            long result = 0;
            using (var connection = new SqlConnection(connectionString))
            {
                result = (long)connection.Insert(tableName,entity);
            }
            return result;
        }

        public User GetUserInfo(long id, string tableName)
        {
            dynamic result;
            var where = new[]
            {
                new QueryField("Id", Operation.Equal, id)
            };
            using(var connection = new SqlConnection(connectionString))
            {
                result = connection.Query<User>(tableName,where).FirstOrDefault();
            }
            return result;
        }

        public IEnumerable<RideInfo> GetRideInfo(AvailableRideRequest request = null, long id = 0, 
            bool isOfferedRides = false)
        {
            object param;
            string queryString = "SELECT r.StartLocation, " +
                            "r.EndLocation, " +
                            "r.Id, " +
                            "r.Price, " +
                            "r.Seats, " +
                            "r.BookingDate, " +
                            "r.TimeSlot, " +
                            "p.FirstName, " +
                            "p.LastName " +
                        "FROM dbo.RideBooked r inner join dbo.Person p on r.OwnerId = p.Id ";
            if (request != null)
            {
                queryString += "WHERE r.StartLocation = @StartLocation AND r.EndLocation = @EndLocation " +
                        "AND r.TimeSlot = @TimeSlot AND r.BookingDate = @BookingDate AND r.PassengerId = 0 ";
                param = new
                {
                    StartLocation = request.StartLoaction,
                    EndLocation = request.EndLoaction,
                    BookingDate = request.BookingDate,
                    TimeSlot = request.TimeSlot
                };
            }
            else
            {
                if (isOfferedRides)
                {
                    queryString += "WHERE r.OwnerId = @Id";
                }
                else
                {
                    queryString += "WHERE r.PassengerId = @Id";
                }
                param = new
                {
                    Id = id
                };
            }
            using (var connection = new SqlConnection(connectionString))
            {
                return connection.ExecuteQuery<RideInfo>(queryString,param);
            }
        }

        public long GetUserId(string email, string password, string tableName)
        {
            dynamic user;
            var where = new []
            {
                new QueryField("Email", Operation.Equal, email),
                new QueryField("Passkey", Operation.Equal, password)
            };
            using (var connection = new SqlConnection(connectionString))
            {
                user = connection.Query<User>(tableName,where).FirstOrDefault();
            }
            return user != null ? user.Id : 0;
        }

        public void Update(long id, string tableName, object entity)
        {
            var where = new[]
            {
                new QueryField("Id", Operation.Equal, id)
            };
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Update(tableName, entity, where);
            }
        }
    }
}
