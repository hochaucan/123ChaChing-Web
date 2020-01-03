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

namespace NextTech.ChaChing123.UI.Web.Controllers
{
    [RoutePrefix("api/users")]
    public class UsersController : ApiControllerBase
    {
        public UsersController() {}


        #region custom methods

        [AllowAnonymous]
        [Route("user")]
        [HttpPost]
        public HttpResponseMessage GetUserAuthorization(HttpRequestMessage request, SearchFilter obj)
        {
            string operationUnit = obj.SearchText;
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                Status status = new Status();
                // Note: you can set your authorization code here
                BTMU.APF.Entities.UserProfile result = BTMU.APF.AspNetIdentity.Core.Users.Get(operationUnit);
                response = request.CreateResponse(HttpStatusCode.OK, new { success = true, obj = result });

                return response;
            });
        }

        [AllowAnonymous]
        [Route("userinfo")]
        [HttpPost]
        public HttpResponseMessage GetUserInfo(HttpRequestMessage request, UsersInfoViewModel obj)
        {

            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                Status status = new Status();

                Users users = new Users();
                users.UserName = obj.UserName;
                users.Domain = obj.Domain;
                var upc = new UsersProcessComponent();
                response = upc.GetUserInfo(users);

                return response;
            });
        }
        #endregion

    }
}
