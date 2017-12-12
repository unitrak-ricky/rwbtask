
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;
using System;
using RWBTaskApi.Models;
using Microsoft.Ajax.Utilities;

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

        public async Task Subscribe(string channel) {
            await Groups.Add(Context.ConnectionId, channel);

            var ev = new RWBTaskEvent
            {
                ChannelName = "AdminChannel",
                Name = "user.subscribed",
                Data = new
                {
                    Context.ConnectionId,
                    ChannelName = channel
                }
            };

            await Publish(ev);
        }

        
        public Task Publish(RWBTaskEvent channelEvent)
        {
            Clients.Group(channelEvent.ChannelName).OnEvent(channelEvent.ChannelName, channelEvent);

            if (channelEvent.ChannelName != RWBTASKCHANNEL)
            {
                // Push this out on the admin channel
                //
                Clients.Group(RWBTASKCHANNEL).OnEvent(RWBTASKCHANNEL, channelEvent);
            }

            return Task.FromResult(0);
        }

        public override Task OnConnected()
        {
            var ev = new RWBTaskEvent
            {
                ChannelName = RWBTASKCHANNEL,
                Name = "user.connected",
                Data = new
                {
                    Context.ConnectionId,
                }
            };

            Publish(ev);

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            var ev = new RWBTaskEvent
            {
                ChannelName = RWBTASKCHANNEL,
                Name = "user.disconnected",
                Data = new
                {
                    Context.ConnectionId,
                }
            };

            Publish(ev);

            return base.OnDisconnected(stopCalled);
        }

        const string RWBTASKCHANNEL = "RWBTaskChannel";
    }

    

}