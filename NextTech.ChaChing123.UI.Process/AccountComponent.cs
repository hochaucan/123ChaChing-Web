using BTMU.APF.Core.Constants;
using Newtonsoft.Json;
using NextTech.ChaChing123.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace NextTech.ChaChing123.UI.Process
{
    public partial class AccountComponent : ProcessComponent
    {
        /// <summary>
        /// Calls the Add operation method in the SettlementAccountNumberService.
        /// </summary>
        /// <param name="Account">An Account object.</param>
        /// <returns>Returns a Account object.</returns>

        public HttpResponseMessage Login(LoginModel obj)
        {
            HttpResponseMessage result = default(HttpResponseMessage);
            string requestUri = "api/Account/Login";
            result = REST(requestUri, RESTConstants.POST, JsonConvert.SerializeObject(obj));
            return result;
        }

        public HttpResponseMessage Register(RegisterDTO obj)
        {
            HttpResponseMessage result = default(HttpResponseMessage);
            string requestUri = "api/Account/Register";
            result = REST(requestUri, RESTConstants.POST, JsonConvert.SerializeObject(obj));
            return result;
        }
    }
}
