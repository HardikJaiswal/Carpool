using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Carpool.Models
{
    public class APIResponse
    {
        public bool IsSuccess { get; set; }

        public dynamic Data { get; set; }

        public string Message { get; set; }
    }
}
