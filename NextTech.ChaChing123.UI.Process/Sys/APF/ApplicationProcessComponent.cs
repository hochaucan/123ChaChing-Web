//====================================================================================================
// Base code generated with APF V2.0 
// Application Platform Framework 
// Generated on 05/05/2016 
//====================================================================================================
using System;
using System.Net.Http;
using Newtonsoft.Json;
using BTMU.APF.Entities;
using BTMU.APF.Core.Models;
using BTMU.APF.Core.Constants;

// NOTE:
//
// User Process Components are used to abstract the common processing task from 
// the UI or control the UI navigation logic. 
//

namespace NextTech.ChaChing123.UI.Process
{
    /// <summary>
    /// Application controller component.
    /// </summary>
    public partial class ApplicationProcessComponent : ProcessComponent
    {


        /// <summary>
        /// Calls the Get operation method in the ApplicationService.
        /// </summary>
        /// <param name="id">An application ID value.</param>
        /// <returns>Returns a Application object.</returns>
        public HttpResponseMessage Get(int id)
        {
                HttpResponseMessage result = default(HttpResponseMessage);
                string requestUri = "api/Application/" + id.ToString();
                result = REST(requestUri, RESTConstants.GET);
                return result;
        }

        /// <summary>
        /// Calls the GetAll operation method in the ApplicationService.
        /// </summary>
        /// <param>Nil</param>
        /// <returns>Returns a list of Application object.</returns>
        public HttpResponseMessage GetAll()
        {
                HttpResponseMessage result = default(HttpResponseMessage);
                string requestUri = "api/Application";
                result = REST(requestUri, RESTConstants.GET);
                return result;
        }


        /// <summary>
        /// Calls the GetAll operation method in the ApplicationService.
        /// </summary>
        /// <param>Nil</param>
        /// <returns>Returns a list of Application object.</returns>
        /// <summary>
        /// Calls the GetAll operation method in the ApplicationService.
        /// </summary>
        /// <param>Nil</param>
        /// <returns>Returns a list of Application object.</returns>
        public DateTime GetCurrentDate()
        {
            HttpResponseMessage result = default(HttpResponseMessage);
            string requestUri = "api/Application/GetCurrentDate";
            result = REST(requestUri, RESTConstants.GET);
            var date = result.Content.ReadAsAsync<DateTime>().Result;
            return date;
        }

        /// <summary>
        /// Calls the GetAll operation method in the ApplicationService.
        /// </summary>
        /// <param>Nil</param>
        /// <returns>Returns a list of Application object.</returns>
        public DateTime GetCurrentDate(string branchCode)
        {
            HttpResponseMessage result = default(HttpResponseMessage);
            string requestUri = "api/Application/GetCurrentDate/" + branchCode;
            result = REST(requestUri, RESTConstants.GET);
            var date = result.Content.ReadAsAsync<DateTime>().Result;
            return date;
        }


        /// <summary>
        /// Calls the GetTimeZoneOffset operation method in the ApplicationService.
        /// </summary>
        /// <param>Nil</param>
        /// <returns>Returns a list of Application object.</returns>
        public decimal GetTimeZoneOffset(string branchCode)
        {
            HttpResponseMessage result = default(HttpResponseMessage);
            string requestUri = "api/Application/GetTimeZoneOffset/" + branchCode;
            result = REST(requestUri, RESTConstants.GET);
            var timeZoneOffset = result.Content.ReadAsAsync<decimal>().Result;
            return timeZoneOffset;
        }

    }
}
