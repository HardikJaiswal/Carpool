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

        public IEnumerable<T> ExecuteQuery<T>(string query,object queryParam)
        {
            IEnumerable<T> result;
            using(var connection = new SqlConnection(connectionString))
            {
                result = connection.ExecuteQuery<T>(query, queryParam);
            }
            return result;
        }

        public void Update(string query, object queryParam)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                connection.ExecuteNonQuery(query, queryParam);
            }
        }
    }
}
