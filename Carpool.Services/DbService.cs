using Carpool.Concerns;
using Microsoft.Data.SqlClient;
using RepoDb;
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

        public int Add<T>(string tableName, T entity)
        {
            int result = 0;
            using (var connection = new SqlConnection(connectionString))
            {
                result = (int)connection.Insert(tableName,entity);
            }
            return result;
        }

        public T Get<T>(string tableName, QueryField[] where) where T : class
        {
            T result;
            using(var connection = new SqlConnection(connectionString))
            {
                result = connection.Query<T>(tableName,where).FirstOrDefault();
            }
            return result;
        }

        public IEnumerable<RideInfo> GetRideInfo(AvailableRideRequest request = null, long id = 0, 
            bool isOfferedRides = false)
        {
            object param;
            string queryString = "SELECT r.Source, " +
                            "r.Destination, " +
                            "r.Id, " +
                            "r.SeatPrice, " +
                            "r.AvailableSeats, " +
                            "r.BookingDate, " +
                            "CONCAT(p.FirstName,' ',p.LastName) as OfferedBy " +
                        "FROM dbo.RideBooked r inner join dbo.Person p on r.OwnerId = p.Id ";
            if (request != null)
            {
                queryString += "WHERE r.Source = @StartLocation AND r.Destination= @EndLocation " +
                        "AND r.BookingDate = @BookingDate AND r.PassengerId = 0 ";
                param = new
                {
                    StartLocation = request.Source,
                    EndLocation = request.Destination,
                    BookingDate = request.Date
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

        public void Update<T>(string tableName, T entity) where T : class
        {
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Update(tableName, entity);
            }
        }
    }
}
