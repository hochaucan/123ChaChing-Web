using AutoMapper;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using BTMU.APF.Entities;
using BTMU.APF.Core.Logging;
using BTMU.APF.Core.Models;
using BTMU.APF.Core.Constants.Identity;
using BTMU.APF.AspNetIdentity.Filters;
using BTMU.APF.Core.Filters;
using BTMU.APF.Core.Filters.ErrorHelper;
using NextTech.ChaChing123.UI.Web.Models;
using NextTech.ChaChing123.UI.Process;
using NextTech.ChaChing123.UI.Web.ActionFilters;
using NextTech.ChaChing123.Common.Constants;
using NextTech.ChaChing123.Common.Resources;
using NextTech.ChaChing123.UI.Web.Infrastructure.Core;

namespace NextTech.ChaChing123.UI.Web.Controllers
{
    [RoutePrefix("api/application")]
    public class ApplicationController : ApiControllerBase
    {
        public ApplicationController() {}      

        [AllowAnonymous]
        [Route("user")]
        [HttpPost]
        [ValidateAntiForgeryTokenFilter]
        public HttpResponseMessage GetUserAuthorization(HttpRequestMessage request, SearchFilter obj)
        {
            string operationUnit = obj.SearchText;
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                UserProfile result = BTMU.APF.AspNetIdentity.Core.Users.Get(operationUnit);
                response = request.CreateResponse(HttpStatusCode.OK, new { success = true, obj = result });
                return response;
            });
        }

        [AuthorizePermission(APFRolesConstants.SystemAdmin)]
        [HttpGet]
        [Route("{id:int}")]
        //[ValidateAntiForgeryTokenFilter]
        public HttpResponseMessage Get(HttpRequestMessage request, int id)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                var upc = new ApplicationProcessComponent();
                response = upc.Get(id);
                return response;
            });
        }

        [AuthorizePermission(APFRolesConstants.SystemAdmin)]
        [HttpGet]
        //[ValidateAntiForgeryTokenFilter]
        public HttpResponseMessage GetAll(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                var upc = new ApplicationProcessComponent();
                response = upc.GetAll();
                return response;
            });
        }


        [AllowAnonymous]
        [Route("GetCurrentDate")]
        [HttpPost]
        //[ValidateAntiForgeryTokenFilter]
        public HttpResponseMessage GetCurrentDate(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                var upc = new ApplicationProcessComponent();
                var operationUnit = GetUserOperationUnit();
                DateTime result;
                if (string.IsNullOrEmpty(operationUnit))
                    result = upc.GetCurrentDate();
                else
                    result = upc.GetCurrentDate(operationUnit);

                response = request.CreateResponse(HttpStatusCode.OK, new { success = true, obj = result });
                return response;
            });
        }

    }
}
