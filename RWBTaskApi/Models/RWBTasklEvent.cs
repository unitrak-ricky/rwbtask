using Newtonsoft.Json;
using System;

namespace RWBTaskApi.Models
{
    public class RWBTaskEvent
    {
        public string Name { get; set; }

        public string ChannelName { get; set; }

        public DateTimeOffset Timestamp { get; set; }

        public object Data
        {
            get { return _data; }
            set
            {
                _data = value;
                this.Json = JsonConvert.SerializeObject(_data);
            }
        }
        private object _data;

        public string Json { get; private set; }

        public RWBTaskEvent()
        {
            Timestamp = DateTimeOffset.Now;
        }
    }
}