using Microsoft.AspNet.SignalR;
using RWBTaskApi.Models;
using RWBTaskDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RWBTaskApi.Controllers
{
    public class HomeController : Controller
    {

        private string _taskChannel = "TaskChannel";
        private IHubContext _context;

        public HomeController()
        {
            _context = GlobalHost.ConnectionManager.GetHubContext<EventHub>();
        }

        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            
            using (var db = new RWBTaskEntitiesConnection())
            {
                var list = db.Lines.Where(l => l.MarketId > 0)
                    .Select(m => new MarketPrice
                    {
                        Id = m.Id,
                        Name = m.Name,
                        Price = m.Price
                    })
                    .ToList();
                return View(list);
            }
            
        }

        public ActionResult Edit(int id)
        {
            using (var db = new RWBTaskEntitiesConnection())
            {
                var price = db.Lines
                    .Where(l => l.Id == id)
                    .Select(m => new MarketPrice
                    {
                        Id = m.Id,
                        Name = m.Name,
                        Price = m.Price
                    }).SingleOrDefault();
                return View(price);
            }
            
        }
        [HttpPost]// POST: /Person/Edit/5 
        public ActionResult Edit(int id, MarketPrice obj)
        {
            try
            {
                using (var db = new RWBTaskEntitiesConnection())
                {
                    var price = db.Lines.FirstOrDefault(l => l.Id == id);
                    var indicator = "UP";
                    if(price != null)
                    {
                        if(obj.Price < price.Price)
                        {
                            indicator = "DOWN";
                        }

                        price.Price = obj.Price;
                        price.Name = obj.Name;
                        db.SaveChanges();
                    }

                    ExecuteTask(indicator, obj.Id, obj.Price);

                    return RedirectToAction("Index");
                }
            }
            catch
            {
                return View();
            }
        }

        private void ExecuteTask(string indicator, long lineId, decimal price)
        {
            
            var lineKey = string.Format("#line_{0}", lineId);

            var status = new Status
            {
                State = indicator == "UP" ? "green" : "red",
                Indicator = lineKey,
                Price = price,
            };

            PublishEvent(indicator, status);
        }

        private void PublishEvent(string indicator, Status status)
        {

            _context.Clients.All.OnEvent(_taskChannel, new ChannelEvent
            {
                ChannelName = _taskChannel,
                Name = indicator,
                Data = status
            });


        }

    }
}
