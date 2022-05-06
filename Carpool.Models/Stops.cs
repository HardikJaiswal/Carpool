using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Carpool.Models
{
    public class Stops
    {
        public int RideId { get; set; }

        public string? StopName { get; set; }

        public int Position { get; set; }
    }
}
