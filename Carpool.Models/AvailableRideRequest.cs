
namespace Carpool.Concerns
{
    public class AvailableRideRequest
    {
        public string StartLoaction { get; set; }

        public string EndLoaction { get; set; }

        public int TimeSlot { get; set; }
        
        public string BookingDate { get; set; }
    }
}
