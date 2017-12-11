
using Microsoft.AspNet.SignalR;

namespace RWBTaskApi
{
    public class TaskHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<TaskHub>();

        public void Hello() 
        {
            Clients.All.hello();
        }

        public static void SayHello() 
        {
            hubContext.Clients.All.hello();
        }
        
    }
}