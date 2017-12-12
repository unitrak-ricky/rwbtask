
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;
using System;
using RWBTaskApi.Models;
using Microsoft.Ajax.Utilities;

namespace RWBTaskApi
{
    
    public class EventHub : Hub
    {
        private string _adminChannel = "AdminChannel";
        public async Task Subscribe(string channel)
        {
            await Groups.Add(Context.ConnectionId, channel);

            var ev = new ChannelEvent
            {
                ChannelName = _adminChannel,
                Name = "user.subscribed",
                Data = new
                {
                    Context.ConnectionId,
                    ChannelName = channel
                }
            };

            await Publish(ev);
        }

        public async Task Unsubscribe(string channel)
        {
            await Groups.Remove(Context.ConnectionId, channel);

            var ev = new ChannelEvent
            {
                ChannelName = _adminChannel,
                Name = "user.unsubscribed",
                Data = new
                {
                    Context.ConnectionId,
                    ChannelName = channel
                }
            };

            await Publish(ev);
        }


        public Task Publish(ChannelEvent channelEvent)
        {
            Clients.Group(channelEvent.ChannelName).OnEvent(channelEvent.ChannelName, channelEvent);

            if (channelEvent.ChannelName != _adminChannel)
            {
                // Push this out on the admin channel
                //
                Clients.Group(_adminChannel).OnEvent(_adminChannel, channelEvent);
            }

            return Task.FromResult(0);
        }


        public override Task OnConnected()
        {
            var ev = new ChannelEvent
            {
                ChannelName = _adminChannel,
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
            var ev = new ChannelEvent
            {
                ChannelName = _adminChannel,
                Name = "user.disconnected",
                Data = new
                {
                    Context.ConnectionId,
                }
            };

            Publish(ev);

            return base.OnDisconnected(stopCalled);
        }
    }

    

}