using NextTech.ChaChing123.Common.Models;
using NextTech.ChaChing123.UI.Process;
using NextTech.ChaChing123.UI.Web.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;

namespace NextTech.ChaChing123.UI.Web.Controllers
{
    [RoutePrefix("api/Account")]
    public class AccountController : ApiControllerBase
    {
        public AccountController()
        {

        }

        [HttpPost]
        [Route("login")]
        public HttpResponseMessage Login(HttpRequestMessage request, LoginModel obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                var upc = new AccountComponent();
                response = upc.Login(obj);
                return response;
            });
        }

        [HttpPost]
        [Route("register")]
        public HttpResponseMessage Register(HttpRequestMessage request, RegisterDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                var upc = new AccountComponent();
                response = upc.Register(obj);
                return response;
            });
        }
    }
}