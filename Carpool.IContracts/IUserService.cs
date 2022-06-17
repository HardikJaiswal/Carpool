using Carpool.Concerns;

namespace Carpool.Contracts
{
    public interface IUserService
    {
        APIResponse GetProfile(int id);

        APIResponse AddUser(string email, string password);

        APIResponse Login(string email, string password);

        APIResponse GetRides(int id, bool isBooked);

        APIResponse UpdateName(int id, string firstName, string lastName);
    }
}