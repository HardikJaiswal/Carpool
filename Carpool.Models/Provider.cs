
using System;

namespace Carpool.Concerns
{
    public class Provider
    {
        private string getTimeFromSlot(int slot)
        {
            return slot switch
            {
                0 => "06:00 AM",
                1 => "10:00 AM",
                2 => "01:00 PM",
                3 => "04:00 PM",
                4 => "07:00 PM",
                _ => "",
            };
        }

        public DateTime GetDate(string bookingDate, int timeSlot)
        {
            string time = getTimeFromSlot(timeSlot);
            int year = int.Parse(bookingDate[..4]),
                month = int.Parse(bookingDate.Substring(5, 2)),
                day = int.Parse(bookingDate.Substring(8, 2)),
                hour = int.Parse(time[..2]);
            if (time.Substring(6, 2) == "PM") hour += 12;

            return new(year, month, day, hour, 0, 0);
        }

        public Ride GetConfiguredRide(OfferrideRequest request)
        {
            Ride ride = request.Ride;
            DateTime date = GetDate(request.Date, request.TimeSlot);
            ride.BookingDate = date;
            return ride;
        }

        public AvailableRideRequest CreateAvailableRideRequest(string source, string destination, string date, int timeslot)
        {
            AvailableRideRequest request = new()
            {
                Source = source,
                Destination = destination,
                Date = GetDate(date, timeslot)
            };
            return request;
        }
    }
}
