
using System;

namespace Carpool.Concerns
{
    public class AvailableRideRequest
    {
        public string Source { get; set; }

        public string Destination { get; set; }

        public DateTime Date { get; set; }
    }
}
