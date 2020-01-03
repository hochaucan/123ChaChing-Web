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
    public partial class SysReportProcessComponent : ProcessComponent
    {

        /// <summary>
        /// Calls the Get operation method in the SysReportService.
        /// </summary>
        /// <param name="id">An application ID value.</param>
        /// <returns>Returns a SysReport object.</returns>
        public HttpResponseMessage GetByApplicationID(Application obj)
        {
            HttpResponseMessage result = default(HttpResponseMessage);
            string requestUri = "api/sysreport/getbyapplicationid";
            result = REST(requestUri, RESTConstants.POST, JsonConvert.SerializeObject(obj));
            return result;
        }


    }
}
