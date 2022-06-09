using Carpool.Concerns;
using Microsoft.EntityFrameworkCore;

namespace Carpool.Services
{
    public class ServiceContext : DbContext
    {
        public DbSet<User> Person { get; set; }

        public DbSet<Ride> RideBooked { get; set; }

        public DbSet<Station> Stations { get; set; }

        public ServiceContext(DbContextOptions<ServiceContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Station>().HasNoKey();
        }
    }
}
