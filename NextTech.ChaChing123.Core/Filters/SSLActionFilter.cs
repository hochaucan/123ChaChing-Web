namespace NextTech.ChaChing123.Core.Filters
{
    using System.Web.Http.Controllers;
    using System.Web.Http.Filters;
    using System.Web.Http;
    using System.Net.Http;
    using System.Net;
    using System.Configuration;

    public class SSLClientCertificateActionWebApiFilter : ActionFilterAttribute
    {

        protected static string ClientCertThumbPrint()
        {
            return ConfigurationManager.AppSettings["ClientCertThumbPrint"];

        }
        protected static string Is2WaySSL()
        {
            return ConfigurationManager.AppSettings["Is2WaySSL"];

        }
        public override void OnActionExecuting(HttpActionContext actionContext)
        {

            string is2WaySSL = Is2WaySSL();

            if (is2WaySSL == "1" || is2WaySSL == "Y")
            {

                //Trust all certificates
                System.Net.ServicePointManager.ServerCertificateValidationCallback =
                    ((sender, certificate, chain, sslPolicyErrors) => true);

                NextTech.ChaChing123.Core.Logging.Logger.Write("is2WaySSL: 1", NextTech.ChaChing123.Core.Models.TraceEventType.VERBOSE);

                var request = actionContext.Request;
                var cert = request.GetClientCertificate();
                if (cert != null)
                {
                    NextTech.ChaChing123.Core.Logging.Logger.Write("cert is not null", NextTech.ChaChing123.Core.Models.TraceEventType.VERBOSE);

                    var thumbPrint = ClientCertThumbPrint();
                    thumbPrint = System.Text.RegularExpressions.Regex.Replace(thumbPrint, @"[^\da-zA-z]", string.Empty).ToUpper();


                    NextTech.ChaChing123.Core.Logging.Logger.Write("thumbPrint:" + thumbPrint, NextTech.ChaChing123.Core.Models.TraceEventType.VERBOSE);

                    if (cert.Thumbprint.ToUpper() != thumbPrint.ToUpper())
                    {
                        NextTech.ChaChing123.Core.Logging.Logger.Write("cert thumbprint is different. Forbidden.", NextTech.ChaChing123.Core.Models.TraceEventType.VERBOSE);

                        throw new HttpResponseException(HttpStatusCode.Forbidden);
                    }
                }
            }
        }

    }

    /*
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    public sealed class ValidateAntiForgeryTokenAttribute : FilterAttribute //, IAuthorizationFilter
    {
        public Task<HttpResponseMessage> ExecuteAuthorizationFilterAsync(HttpActionContext actionContext, CancellationToken cancellationToken, Func<Task<HttpResponseMessage>> continuation)
        {
            try
            {
                System.Web.Helpers.AntiForgery.Validate();
            }
            catch
            {
                actionContext.Response = new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.Forbidden,
                    RequestMessage = actionContext.ControllerContext.Request
                };
                return FromResult(actionContext.Response);
            }
            return continuation();
        }

        private Task<HttpResponseMessage> FromResult(HttpResponseMessage result)
        {
            var source = new TaskCompletionSource<HttpResponseMessage>();
            source.SetResult(result);
            return source.Task;
        }
    }


    public class ValidateAntiForgeryAngular : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext filterContext)
        {
            var headers = filterContext.Request.Headers;
            string cookieToken = null;
            string formToken = null;
            var rvt = headers.GetValues("RequestVerificationToken").FirstOrDefault();
            if (rvt != null)
            {
                string[] tokens = rvt.Split(':');
                if (tokens.Length == 2)
                {
                    cookieToken = tokens[0].Trim();
                    formToken = tokens[1].Trim();
                }
            }
            System.Web.Helpers.AntiForgery.Validate(cookieToken, formToken);
        }
    }

    public static class AntiForgeryExtension
    {
        public static string RequestVerificationToken(this HtmlHelper helper)
        {
            return String.Format("anti-forgery-token={0}", GetTokenHeaderValue());
        }

        private static string GetTokenHeaderValue()
        {
            string cookieToken, formToken;
            System.Web.Helpers.AntiForgery.GetTokens(null, out cookieToken, out formToken);
            return cookieToken + ":" + formToken;
        }
    }

    */
    /*
    public sealed class ValidateAntiForgeryTokenFilter : ActionFilterAttribute
    {
        private const string XsrfHeader = "XSRF-TOKEN";
        private const string XsrfCookie = "xsrf-token";

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            HttpRequestHeaders headers = actionContext.Request.Headers;
            IEnumerable xsrfTokenList;

            if (!headers.TryGetValues(XsrfHeader, out xsrfTokenList))
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.BadRequest);
                return;
            }

            string tokenHeaderValue = xsrfTokenList.First();

            CookieState tokenCookie = actionContext.Request.Headers.GetCookies().Select(c = &gt;
            c[XsrfCookie]).FirstOrDefault();

            if (tokenCookie == null)
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.BadRequest);
                return;
            }

            try
            {
                AntiForgery.Validate(tokenCookie.Value, tokenHeaderValue);
            }
            catch (HttpAntiForgeryException)
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
        }
        
    }*/
}
