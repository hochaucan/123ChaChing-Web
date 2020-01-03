using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Security.Cryptography.X509Certificates;
using Newtonsoft.Json;
using System.Web.Http;

namespace NextTech.ChaChing123.UI.Process
{
    /// <summary>
    /// Base class for UI Controllers (not the ASP.NET MVC Controllers).
    /// This class is purposely renamed to ProcessComponent to avoid confusion from the MVC controllers.
    /// </summary>
    public abstract class ProcessComponent : ApiController
    {

        private HttpRequestMessage __request;

        public void SetHttpRequestMessage(HttpRequestMessage r)
        {
            __request = r;

        }
        /// <summary>
        /// Get the Operation Unit from request headers
        /// </summary>
        /// <param name="">N.A.</param>
        /// <returns>A string containing the Operation Unit from the request header</returns>
        public string GetOperationUnitFromHeader()
        {

            var re = __request; // Request;
            string token = string.Empty;

            try
            {
                if (re != null)
                {
                    var headers = re.Headers;
                    if (headers.Contains("X-Operation-Unit"))
                    {
                        token = headers.GetValues("X-Operation-Unit").First();
                    }
                }
            }
            catch
            {
                token = string.Empty;
            }

            return token;
        }

        /// <summary>
        /// Get the Service URL for the app server
        /// </summary>
        /// <param name="">N.A.</param>
        /// <returns>A string containing the URL of the app server</returns>
        protected string ServiceUrl()
        {
            return ConfigurationManager.AppSettings["serviceUrl"];

        }

        /// <summary>
        /// Get the Service URL for Authorization
        /// </summary>
        /// <param name="">N.A.</param>
        /// <returns>A string containing the URL of the Authorization Service</returns>
        protected string AuthorizeServiceUrl()
        {
            return ConfigurationManager.AppSettings["AuthorizeServiceUrl"];

        }

        /// <summary>
        /// Get the flag to indicate whether to use Two Way SSL
        /// </summary>
        /// <param name="">N.A.</param>
        /// <returns>A string containing with 1 or 0</returns>
        protected string Is2WaySSL()
        {
            return ConfigurationManager.AppSettings["Is2WaySSL"];

        }

        /// <summary>
        /// Get the ClientCertThumbPrint from the web.config file
        /// </summary>
        /// <param name="">N.A.</param>
        /// <returns>A string containing the certificate thumbprint</returns>
        protected string ClientCertThumbPrint()
        {
            return ConfigurationManager.AppSettings["ClientCertThumbPrint"];

        }



        /// <summary>
        /// Retrieve the Client Certificate from the Certificate Store My folder
        /// </summary>
        /// <param name="thumbPrint">The thumbPrint of the certificate</param>
        /// <returns>An object WebRequestHandler containing the client certificate.</returns>
        private WebRequestHandler GetCert(string thumbPrint)
        {
            thumbPrint = System.Text.RegularExpressions.Regex.Replace(thumbPrint, @"[^\da-zA-z]", string.Empty).ToUpper();

            X509Store store = new X509Store(StoreName.My, StoreLocation.LocalMachine);
            store.Open(OpenFlags.OpenExistingOnly | OpenFlags.ReadOnly);
            // var cert = store.Certificates.Find(X509FindType.FindByThumbprint, "ff9afddf408ccd62a5dc83aacc48f8432ab7c86c", false)[0];
            var cert = store.Certificates.Find(X509FindType.FindByThumbprint, thumbPrint, false)[0];

            if (cert != null)
                BTMU.APF.Core.Logging.Logger.Write("Cert Thumbprint: " + cert.Thumbprint, BTMU.APF.Core.Models.TraceEventType.VERBOSE);
            else
                BTMU.APF.Core.Logging.Logger.Write("Cert is null", BTMU.APF.Core.Models.TraceEventType.VERBOSE);


            var messageHandler = new WebRequestHandler();
            messageHandler.ClientCertificates.Add(cert);
            messageHandler.ClientCertificateOptions = ClientCertificateOption.Manual;
            store.Close();

            // TODO: add to application cache
            return messageHandler;

        }

        /// <summary>
        /// Retrieve the X509 Client Certificate from the Certificate Store My folder
        /// </summary>
        /// <param name="thumbPrint">The thumbPrint of the certificate</param>
        /// <returns>An object containing the client certificate.</returns>
        private X509Certificate2 GetX509Certificate(string thumbPrint)
        {
            thumbPrint = System.Text.RegularExpressions.Regex.Replace(thumbPrint, @"[^\da-zA-z]", string.Empty).ToUpper();

            X509Store store = new X509Store(StoreName.My, StoreLocation.LocalMachine);
            store.Open(OpenFlags.OpenExistingOnly | OpenFlags.ReadOnly);
            var cert = store.Certificates.Find(X509FindType.FindByThumbprint, thumbPrint, false)[0];
            return cert;

        }



        /// <summary>
        /// Sends a Http Get/Post/Delete request to a URL.
        /// </summary>
        /// <param name="requestUri">The path and query to call.</param>
        /// <param name="restType">GET, POST, DELETE</param>
        /// <returns>An object specified in the generic type.</returns>
        /// 
        public HttpResponseMessage REST(string requestUri, string restType)
        {
            return REST(requestUri, restType, null);
        }

        /// <summary>
        /// Sends a Http Get/Post/Delete request to a URL.
        /// </summary>
        /// <param name="requestUri">The path and query to call.</param>
        /// <param name="restType">GET, POST, DELETE</param>
        /// <param name="postBody">GET, POST, DELETE</param>
        /// <returns>An object specified in the generic type.</returns>
        /// 
        public HttpResponseMessage REST(string requestUri, string restType, string postBody)
        {

            HttpResponseMessage result = default(HttpResponseMessage);

            string is2WaySSL = Is2WaySSL();


            // Message = "The underlying connection was closed: Could not establish trust relationship for the SSL/TLS secure channel."
            //Trust all certificates
            System.Net.ServicePointManager.ServerCertificateValidationCallback =
                ((sender, certificate, chain, sslPolicyErrors) => true);

            System.Net.ServicePointManager.Expect100Continue = true;
            System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Ssl3 | System.Net.SecurityProtocolType.Tls | System.Net.SecurityProtocolType.Tls11 | System.Net.SecurityProtocolType.Tls12;


            if (is2WaySSL == "Y" || is2WaySSL == "1")
            {

                string thumbPrint = ClientCertThumbPrint();
                thumbPrint = System.Text.RegularExpressions.Regex.Replace(thumbPrint, @"[^\da-zA-z]", string.Empty).ToUpper();

                BTMU.APF.Core.Logging.Logger.Write("is2WaySSL: " + is2WaySSL, BTMU.APF.Core.Models.TraceEventType.VERBOSE);
                BTMU.APF.Core.Logging.Logger.Write("thumbPrint in web.config: " + thumbPrint, BTMU.APF.Core.Models.TraceEventType.VERBOSE);

                WebRequestHandler messageHandler = GetCert(thumbPrint);

                BTMU.APF.Core.Logging.Logger.Write("messageHandler: process messageHandler", BTMU.APF.Core.Models.TraceEventType.VERBOSE);

                // Execute the Http call.
                using (HttpClient client = new HttpClient(messageHandler))
                {

                    BTMU.APF.Core.Logging.Logger.Write("HttpClient: process HttpClient", BTMU.APF.Core.Models.TraceEventType.VERBOSE);

                    client.BaseAddress = new Uri(ServiceUrl());
                    client.Timeout = TimeSpan.FromMinutes(15);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(MediaType.Json));
                    client.DefaultRequestHeaders.Add("X-Operation-Unit", GetOperationUnitFromHeader());
                    AsyncHelper<Object> aHelper = new AsyncHelper<object>(client);
                    BTMU.APF.Core.Logging.Logger.Write("process restType: " + restType, BTMU.APF.Core.Models.TraceEventType.VERBOSE);

                    if (restType == "GET")
                        //result = client.GetAsync(requestUri).Result;
                        result = aHelper.GetAsync(requestUri);
                    else if (restType == "POST")
                    {
                        //result = client.PostAsync(requestUri, new StringContent(postBody, Encoding.UTF8, MediaType.Json)).Result;
                        result = aHelper.PostAsync(requestUri, new StringContent(postBody, Encoding.UTF8, MediaType.Json));
                    }
                    else if (restType == "DELETE")
                        //result = client.DeleteAsync(requestUri).Result;
                        result = aHelper.DeleteAsync(requestUri);
                    else
                        //result = client.GetAsync(requestUri).Result;
                        result = aHelper.GetAsync(requestUri);

                    BTMU.APF.Core.Logging.Logger.Write("EnsureSuccessStatusCode", BTMU.APF.Core.Models.TraceEventType.VERBOSE);

                    result.EnsureSuccessStatusCode();
                }

            }
            else
            {
                // Execute the Http call.
                using (HttpClient client = new HttpClient())
                {
                    client.BaseAddress = new Uri(ServiceUrl());
					client.Timeout = TimeSpan.FromMinutes(15);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(MediaType.Json));
                    client.DefaultRequestHeaders.Add("X-Operation-Unit", GetOperationUnitFromHeader());
                    AsyncHelper<Object> aHelper = new AsyncHelper<object>(client);

                    if (restType == "GET")
                        //result = client.GetAsync(requestUri).Result;
                        result = aHelper.GetAsync(requestUri);
                    else if (restType == "POST")
                    {
                        //result = client.PostAsync(requestUri, new StringContent(postBody, Encoding.UTF8, MediaType.Json)).Result;
                        result = aHelper.PostAsync(requestUri, new StringContent(postBody, Encoding.UTF8, MediaType.Json));
                    }
                    else if (restType == "DELETE")
                        //result = client.DeleteAsync(requestUri).Result;
                        result = aHelper.DeleteAsync(requestUri);
                    else
                        //result = client.GetAsync(requestUri).Result;
                        result = aHelper.GetAsync(requestUri);

                    result.EnsureSuccessStatusCode();
                }
            }

            return result;
        }

    }

    class AsyncHelper<T>
    {
        private HttpClient _client;
        public AsyncHelper(HttpClient client)
        {
            _client = client;
        }

        public HttpResponseMessage GetAsync(string requestUri)
        {
            return _client.GetAsync(requestUri).Result;
        }

        public HttpResponseMessage PostAsync(string requestUri, HttpContent content)
        {
            return _client.PostAsync(requestUri, content).Result;
        }

        public HttpResponseMessage DeleteAsync(string requestUri)
        {
            return _client.DeleteAsync(requestUri).Result;
        }
    }
}
