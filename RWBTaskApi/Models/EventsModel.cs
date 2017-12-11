using RWBTaskDAL;
using System;
using System.Collections.Generic;
using RWBTaskApi.Controllers;
using System.Runtime.Serialization;

namespace RWBTaskApi.Models
{
    public class EventsModel
    {
        public EventsModel()
        {
            this.EventMarkets = new List<EventMarket>();
            this.Test = new List<string>();
        }
        public string Name { get; set; }
        public string Sport { get; set; }
        public string Category { get; set; }
        public string League { get; set; }
        public DateTime StartTime { get; set; }

        public long Id { get; internal set; }
        public long CategoryId { get; internal set; }
        public long LeagueId { get; internal set; }
        public long SportId { get; internal set; }
        public List<EventMarket> EventMarkets { get; set; }
        public List<string> Test { get; internal set; }
    }

    public class MarketLine
    {
        public long Id { get; internal set; }
        public long LineId { get; internal set; }
        public long MarketId { get; internal set; }
        public string Name { get; internal set; }
        public decimal Price { get; internal set; }
    }

    public class EventMarket
    {
        public EventMarket()
        {
            this.EventMarketsLines = new List<MarketLine>();
        }
        public long Id { get; set; }
        public string Name { get; set; }
        public long EventId { get; set; }
        public List<MarketLine> EventMarketsLines { get; internal set; }
        public bool IsLive { get; internal set; }
        public string LineName { get; internal set; }
        public decimal Price { get; internal set; }
        public long LineId { get; internal set; }
    }
}