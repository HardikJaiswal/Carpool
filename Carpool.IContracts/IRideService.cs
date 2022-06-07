using Microsoft.AspNetCore.Mvc;
using Carpool.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Carpool.IContracts
{
    public interface IRideService
    {
        APIResponse GetAvailableRides(string source, string destination, string date, int timeSlot);

        APIResponse BookRide(int rideId, int bookerId);

        APIResponse OfferRide(int ownerId, string startLocation, string endLocation, string bookingDate,
            int timeSlot, int seats, int price);
    }
}
