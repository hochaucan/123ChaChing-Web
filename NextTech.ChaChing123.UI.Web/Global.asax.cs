using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Http;
using NextTech.ChaChing123.UI.Web.App_Start;
using System.Web.Optimization;

namespace NextTech.ChaChing123.UI.Web
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            var config = GlobalConfiguration.Configuration;

            AreaRegistration.RegisterAllAreas();
            WebApiConfig.Register(config);
            Bootstrapper.Run();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            GlobalConfiguration.Configuration.EnsureInitialized();
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            //AreaRegistration.RegisterAllAreas();
            //FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            //RouteConfig.RegisterRoutes(RouteTable.Routes);
            //BundleConfig.RegisterBundles(BundleTable.Bundles);


        }

        void Session_OnStart()
        {
            // write to SignInLog - logintime, userid, sessionID, ServerName
            //Application.Lock();
            //Application["UsersOnline"] = (int)Application["UsersOnline"] + 1;
            //Application.UnLock();
        }

        void Session_OnEnd()
        {
            // write to SignInLog - logouttime, userid
            //Application.Lock();
            //Application["UsersOnline"] = (int)Application["UsersOnline"] - 1;
            //Application.UnLock();
        }
    }
}