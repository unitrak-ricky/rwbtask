using Microsoft.Owin;
using Owin;
using System.Web.Http;

[assembly: OwinStartup(typeof(RWBTaskApi.Startup))]

namespace RWBTaskApi
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
            app.MapSignalR();

            var httpConfig = new HttpConfiguration();

            httpConfig.MapHttpAttributeRoutes();

            app.UseWebApi(httpConfig);
        }

       
    }
}
