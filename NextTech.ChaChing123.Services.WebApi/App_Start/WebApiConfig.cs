// using NextTech.ChaChing123.Services.WebApi.MessageHandlers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using NextTech.ChaChing123.Services.WebApi.ActionFilters;

namespace NextTech.ChaChing123.Services.WebApi
{
    /// <summary>
    /// Class WebApiConfig.
    /// </summary>
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            var corsAttr = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(corsAttr);

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // Web API Logging and Global Exception
            config.Filters.Add(new LoggingFilterAttribute());
            config.Filters.Add(new GlobalExceptionAttribute());
        }
    }
}
