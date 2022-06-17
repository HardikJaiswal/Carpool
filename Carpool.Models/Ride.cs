using System;

namespace Carpool.Concerns
{
    public class Ride
    {
        public int Id { get; set; }

        public string Source { get; set; }

        public string Destination { get; set; }

        public int AvailableSeats { get; set; }

        public float Price { get; set; }

        public DateTime BookingDate { get; set; }

        public int OwnerId { get; set; }

        public int PassengerId { get; set; }
    }
}
