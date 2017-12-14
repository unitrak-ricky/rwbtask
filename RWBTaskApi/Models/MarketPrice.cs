using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RWBTaskApi.Models
{
    public class MarketPrice
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
    }
}