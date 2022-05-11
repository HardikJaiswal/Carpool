using Carpool.IContracts;
using Carpool.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Carpool.Services
{
    public class RideService : IRideService
    {
        private readonly ServiceContext _context;

        public RideService(ServiceContext serviceContext)
        {
            _context = serviceContext;
        }

        public IActionResult BookRide(int rideId, int bookerId)
        {
            var cur = _context.Rides?.FirstOrDefault(r => r.RideId == rideId);
            cur.PassengerId = bookerId;
            _context.SaveChanges();
            return new OkResult();
        }

        public List<Ride> FindRides(string source, string destination, string date, int timeSlot)
        {
            return _context.Rides.Where(r => r.PassengerId == 0 && r.BookingDate == date 
                && r.StartLocation == source && r.TimeSlot == timeSlot && r.EndLocation == destination).ToList();
        }

        public IActionResult OfferRide(int id, string startPoint, string endPoint, string date, int timeslot,
             int price, int seats)
        {
            Ride cur = new Ride()
            {
                RideId = GenerateId(),
                OwnerId = id,
                PassengerId = 0,
                StartLocation = startPoint,
                EndLocation = endPoint,
                BookingDate = date,
                TimeSlot = timeslot,
                Price = price,
                Seats = seats
            };
            _context.Rides?.Add(cur);
            _context.SaveChanges();
            return new OkResult();
        }

        private int GenerateId()
        {
            var random = new Random();
            int newId = random.Next(100);
            while (IsRideIdPresent(newId))
                newId = random.Next(100);
            return newId;
        }

        private bool IsRideIdPresent(int id)
        {
            return _context.Rides?.FirstOrDefault(r => r.RideId == id) != null;
        }
    }
}
