using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Helpers;
using System.Web.Http.Controllers;
using System.Web.Mvc;
using ActionFilterAttribute = System.Web.Http.Filters.ActionFilterAttribute;

using System;
using System.Web.Http.Filters;

namespace NextTech.ChaChing123.UI.Web.ActionFilters
{
    public sealed class ValidateAntiForgeryTokenFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(
            System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            if (actionContext == null)
            {
                throw new ArgumentNullException("actionContext");
            }

            if (actionContext.Request.Method.Method != "GET")
            {
                if (System.Configuration.ConfigurationManager.AppSettings["ValidateAntiForgery"] == "1")
                {
                    var headers = actionContext.Request.Headers;
                    var tokenCookie = headers
                        .GetCookies()
                        .Select(c => c[AntiForgeryConfig.CookieName])
                        .FirstOrDefault();

                    var tokenHeader = string.Empty;
                    if (headers.Contains("X-XSRF-Token"))
                    {
                        tokenHeader = headers.GetValues("X-XSRF-Token").FirstOrDefault();
                    }

                    if (string.IsNullOrEmpty(tokenHeader))
                    {
                        actionContext.Response = new HttpResponseMessage(HttpStatusCode.BadRequest);
                        return;
                    }
                    else
                    {

                        try
                        {
                            AntiForgery.Validate(
                                tokenCookie != null ? tokenCookie.Value : null, tokenHeader);
                        }
                        catch (HttpAntiForgeryException)
                        {
                            actionContext.Response = new HttpResponseMessage(HttpStatusCode.BadRequest);
                            return;
                        }
                    }
                }
            }

            base.OnActionExecuting(actionContext);
        }
    }

 
}

