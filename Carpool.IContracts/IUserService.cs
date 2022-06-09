using Carpool.Concerns;

namespace Carpool.Contracts
{
    public interface IUserService
    {
        APIResponse GetProfile(long id);

        APIResponse AddUser(string email, string password);

        APIResponse GetUserIdIfPresent(string email, string password);

        APIResponse GetRides(long id, bool isBooked);

        APIResponse UpdateName(long id, string firstName, string lastName);
    }
}