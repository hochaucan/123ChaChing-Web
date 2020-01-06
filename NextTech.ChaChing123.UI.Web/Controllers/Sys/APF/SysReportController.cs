using AutoMapper;
using NextTech.ChaChing123.UI.Web.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using NextTech.ChaChing123.UI.Web.Models;
using NextTech.ChaChing123.UI.Process;
using BTMU.APF.Entities;
using BTMU.APF.Core.Logging;
using BTMU.APF.Core.Models;
using NextTech.ChaChing123.Common.Constants;
using NextTech.ChaChing123.Common.Resources;
using NextTech.ChaChing123.UI.Web.ActionFilters;

namespace NextTech.ChaChing123.UI.Web.Controllers
{
    [RoutePrefix("api/sysreport")]
    public class SysReportController : ApiControllerBase
    {
        public SysReportController() {}


        #region custom methods

        [AllowAnonymous]
        [Route("getbyapplicationid")]
        [HttpPost]
        [ValidateAntiForgeryTokenFilter]
        public HttpResponseMessage GetByApplicationID(HttpRequestMessage request, Application obj)
        {
            return CreateHttpResponse(request, () =>
            {

                // Sample - Get User's Operation Unit
                //var operationUnit = GetUserOperationUnit();

                HttpResponseMessage response = null;
                var upc = new SysReportProcessComponent();
                response = upc.GetByApplicationID(obj);
                return response;
            });
        }

        #endregion

    }
}
