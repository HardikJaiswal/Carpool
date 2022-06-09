
namespace Carpool.Concerns
{
    public class RideInfo
    {
        public long Id { get; set; }

        public string StartLocation { get; set; }

        public string EndLocation { get; set; }

        public int Seats { get; set; }

        public int Price { get; set; }

        public string BookingDate { get; set; }

        public int TimeSlot { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}
