using Microsoft.AspNet.SignalR;
using RWBTaskApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Cors;

namespace RWBTaskApi.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    [RoutePrefix("tasks")]
    public class TaskController : ApiController
    {
        private IHubContext _context;

        // This can be defined a number of ways
        //
        private string _channel = "AdminChannel";
        private string _taskChannel = "TaskChannel";

        public TaskController()
        {
            _context = GlobalHost.ConnectionManager.GetHubContext<EventHub>();
        }

        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        [Route("long")]
        [HttpGet]
        public IHttpActionResult GetLongTask()
        {
            
            double steps = 10;
            var eventName = "longTask.status";

            ExecuteTask(eventName, steps);

            return Ok("Long task complete");
        }


        private void ExecuteTask(string eventName, double steps)
        {
            var status = new Status
            {
                State = "completed",
                Indicator= "red",
                PercentComplete = 100,
            };
            
            PublishEvent(eventName, status);
        }

        private void PublishEvent(string eventName, Status status)
        {
            // From .NET code like this we can't invoke the methods that
            //  exist on our actual Hub class...because we only have a proxy
            //  to it. So to publish the event we need to call the method that
            //  the clients will be listening on.
            //

            _context.Clients.All.OnEvent(_taskChannel, new ChannelEvent
            {
                ChannelName = _taskChannel,
                Name = eventName,
                Data = status
            });

            //_context.Clients.Group(_channel).OnEvent(_taskChannel, new ChannelEvent
            //{
            //    ChannelName = _taskChannel,
            //    Name = eventName,
            //    Data = status
            //});
        }
    }

    
    public class Status
    {
        public string State { get; set; }
        public string Indicator { get; set; }
        public double PercentComplete { get; set; }
    }
}