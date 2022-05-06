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
        List<Ride> FindRides(string source, string destination, string date, string timeSlot);

        IActionResult BookRide(int rideId, int bookerId);

        IActionResult OfferRide(int id, string startPoint, string endPoint, string date, int timeslot,
             int price, int seats);
    }
}
