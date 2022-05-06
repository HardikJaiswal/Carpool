using Carpool.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Carpool.Services
{
    public class ServiceContext : DbContext
    {
        public DbSet<User> Person { get; set; }

        public DbSet<Ride> Rides { get; set; }

        public DbSet<Stops> Stops { get; set; }

        public ServiceContext(DbContextOptions<ServiceContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Stops>().HasNoKey();
        }
    }
}
