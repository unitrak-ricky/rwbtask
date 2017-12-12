using RWBTaskApi.Models;
using RWBTaskDAL;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace RWBTaskApi.Controllers
{
    public class ValuesController : ApiController
    {

        [AllowAnonymous]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        [HttpGet]
        [Route("api/values/negotiate")]
        public IHttpActionResult Get()
        {
            return Ok();
        }
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        [HttpGet]
        [Route("api/values/GetEvents")]
        public IHttpActionResult GetEvents()
        {
            //return Ok(new string[] { "Hello World!", "This is a task." });

            var list = new List<EventsModel>();

            using (var db = new RWBTaskEntitiesConnection())
            {
                list = db.vwEventInformations.Select(ev => new EventsModel
                {
                    Id = ev.Id,
                    Name = ev.Name,
                    SportId = ev.SportId,
                    Sport = ev.SportName,
                    LeagueId = ev.LeagueId,
                    League = ev.LeagueName,
                    CategoryId = ev.CategoryId,
                    Category = ev.CategoryName,
                    StartTime = ev.StartTime,
                }).ToList();

                list.ForEach(l => CalcEventMarket(l, db));

                db.Dispose();
            }
            return Ok(list);
        }

        private void CalcEventMarket(EventsModel model, RWBTaskEntitiesConnection db)
        {
            db.vwEventMarketLines
                .Where(m => m.EventId == model.Id)
                .ToList().ForEach(li => model.Test.Add(li.MarketName + " - Live: " + li.IsLive));


            model.EventMarkets = db.vwEventMarketLines
                .Where(m => m.EventId == model.Id)
                .Select(sm => new EventMarket
                {
                    Id = sm.Id,
                    Name = sm.MarketName,
                    IsLive = sm.IsLive,
                    LineName = sm.LineName,
                    Price = sm.Price,
                    EventId = sm.EventId,
                    LineId = sm.LineId
                })
                .ToList();
            //model.EventMarkets.ForEach(m => CalcMarketLine(m, db));
        }

        private void CalcMarketLine(EventMarket m, RWBTaskEntitiesConnection db)
        {
            m.EventMarketsLines = db.vwEventMarketLines
                .Where(l => l.Id == m.Id)
                .Select(ls => new MarketLine
                {
                    MarketId = m.Id,
                    Id = ls.Id,
                    Name = ls.LineName,
                    Price = ls.Price,
                    LineId = ls.LineId
                })
                .ToList();
        }

    }

   
}
