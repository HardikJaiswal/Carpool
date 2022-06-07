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

        public APIResponse BookRide(int rideId, int bookerId)
        {
            try
            {
                var cur = _context.RideBooked?.FirstOrDefault(r => r.RideId == rideId);
                cur.PassengerId = bookerId;
                _context.SaveChanges();
            }
            catch(Exception ex)
            {
                return new APIResponse { IsSuccess = false, Message = ex.Message };
            }
            return new APIResponse { IsSuccess = true };
        }

        public APIResponse GetAvailableRides(string source, string destination, string date, int timeSlot)
        {
            dynamic res;
            try
            {
                res = (from r in _context.RideBooked
                       join p in _context.Person on r.OwnerId equals p.UserId
                       where r.PassengerId == 0 && r.BookingDate == date && r.StartLocation == source && 
                            r.TimeSlot == timeSlot && r.EndLocation == destination
                       select new
                       {
                           r.RideId,
                           r.StartLocation,
                           r.EndLocation,
                           r.Price,
                           r.BookingDate,
                           r.TimeSlot,
                           r.Seats,
                           p.FirstName,
                           p.LastName
                       }).ToList();
            }catch (Exception e)
            {
                return new APIResponse { IsSuccess = false, Message = e.Message };
            }
            return new APIResponse { Data = res, IsSuccess = true };
        }

        public APIResponse OfferRide(int ownerId, string startLocation, string endLocation, string bookingDate,
            int timeSlot, int seats, int price)
        {
            Ride ride = new Ride
            {
                OwnerId = ownerId,
                StartLocation = startLocation,
                EndLocation = endLocation,
                BookingDate = bookingDate,
                TimeSlot = timeSlot,
                Seats = seats,
                Price = price
            };
            try
            {
                ride.RideId = GenerateId();
                ride.PassengerId = 0;
                _context.RideBooked?.Add(ride);
                _context.SaveChanges();
            }catch(Exception e)
            {
                return new APIResponse { IsSuccess=false, Message = e.Message };
            }
            return new APIResponse { IsSuccess = true };
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
            return _context.RideBooked?.FirstOrDefault(r => r.RideId == id) != null;
        }
    }
}
