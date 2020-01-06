using NextTech.ChaChing123.Common.Models;
using NextTech.ChaChing123.Core.Models;
using NextTech.ChaChing123.Data.Infrastructure;

namespace NextTech.ChaChing123.Services.WebApi.Controllers
{
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;

    using NextTech.ChaChing123.Entities;
    using NextTech.ChaChing123.Services.WebApi.Infrastructure.Core;
    using NextTech.ChaChing123.Business;
    using NextTech.ChaChing123.Core.Filters;
    using NextTech.ChaChing123.Core.Filters.ErrorHelper;
    using Common.Constants;
    using NextTech.ChaChing123.Business.Utilities;

    /// <summary>
    /// Class AccountController.
    /// </summary>
    /// <seealso cref="NextTech.ChaChing123.Services.WebApi.Infrastructure.Core.ApiControllerBase" />
    [SSLClientCertificateActionWebApiFilter]
    [RoutePrefix("api/Account")]
    public class AccountController : ApiControllerBase
    {

        /// <summary>
        /// The service
        /// </summary>
        private readonly IAccountService _service;

        /// <summary>
        /// Initializes a new instance of the <see cref="AccountController"/> class.
        /// </summary>
        /// <param name="interfaceService">The interface service.</param>
        /// <param name="_unitOfWork">The unit of work.</param>
        public AccountController(IAccountService interfaceService, IUnitOfWork _unitOfWork)
            : base(_unitOfWork)
        {
            _service = interfaceService;
        }

        
        private ResultDTO ValidateRegisterData(RegisterDTO obj)
        {
            ResultDTO resul = new ResultDTO();
            resul.StatusCode = Common.ConvertErrorCodeToInt(RetCode.ECS0000);

            if (string.IsNullOrEmpty(obj.UserName))
            {
                resul.StatusCode= Common.ConvertErrorCodeToInt(RetCode.ECS0001);
                resul.SetContentMsg();
            }

            else if (string.IsNullOrEmpty(obj.FullName))
            {
                resul.StatusCode = Common.ConvertErrorCodeToInt(RetCode.ECS0002);
                resul.SetContentMsg();
            }

            else if(string.IsNullOrEmpty(obj.Email))
            {
                resul.StatusCode = Common.ConvertErrorCodeToInt(RetCode.ECS0003);
                resul.SetContentMsg();
            }
            /*[Start] TODO xu ly trong store
            else if(Common.IsValidEmail(obj.Email))
            {
                resul.StatusCode = Common.ConvertErrorCodeToInt(RetCode.ECS0004);
                resul.StatusMsg = RetCodeMsg.ECS004;
            }
            else if (Common.IsExitsEmail(obj.Email))
            {
                resul.StatusCode = Common.ConvertErrorCodeToInt(RetCode.ECS0005);
                resul.StatusMsg = RetCodeMsg.ECS005;
            }
            *********[End] TODO*/
            else if (string.IsNullOrEmpty(obj.RefCode))
            {
                resul.StatusCode = Common.ConvertErrorCodeToInt(RetCode.ECS0006);
                resul.SetContentMsg();
            }
            /*xu ly trong store
            else if (IsExitsEmail(obj.RefCode))
            {
                resul.StatusCode = Common.ConvertErrorCodeToInt(RetCode.ECS0007);
                resul.StatusMsg = RetCodeMsg.ECS007;
            }
            */
            else if (string.IsNullOrEmpty(obj.Phone))
            {
                resul.StatusCode = Common.ConvertErrorCodeToInt(RetCode.ECS0008);
                resul.SetContentMsg();
            }
            /*xu ly trong store
            else if (IsExitsPhone(obj.Phone))
            {
                resul.StatusCode = Common.ConvertErrorCodeToInt(RetCode.ECS0009);
                resul.StatusMsg = RetCodeMsg.ECS009;
            }
            */
            /*xu ly them truong hop ko hop le*/
           else if (string.IsNullOrEmpty(obj.Password))
           {
               resul.StatusCode = Common.ConvertErrorCodeToInt(RetCode.ECS0010);
                resul.SetContentMsg();
            }

           return resul;
       }

        private ResultDTO ValidateLoginData(LoginModel obj)
        {
            ResultDTO resul = new ResultDTO();
            resul.StatusCode = Common.ConvertErrorCodeToInt(RetCode.ECS0000);

            if (string.IsNullOrEmpty(obj.UserName))
            {
                resul.StatusCode = Common.ConvertErrorCodeToInt(RetCode.ECS0001);
                resul.SetContentMsg();
            }
            else if (string.IsNullOrEmpty(obj.Password))
            {
                resul.StatusCode = Common.ConvertErrorCodeToInt(RetCode.ECS0010);
                resul.SetContentMsg();
            }
            return resul;
        }

        /// <summary>
        /// Checks the login.
        /// </summary>
        /// <param name="obj">The object.</param>
        /// <returns>true: next/ else:stop</returns>
        private bool VerifykAccessWithRoot(Account obj)
       {
           if (string.IsNullOrEmpty(obj.CreatedBy) || string.IsNullOrEmpty(obj.UpdatedBy))
               return false;
           return Business.Utilities.Common.VerifykAccessWithRoot(obj.CreatedBy, obj.UpdatedBy);

       }

       private bool CheckLogin(CheckLoginDTO obj)
       {
           if (string.IsNullOrEmpty(obj.UserName) || string.IsNullOrEmpty(obj.SessionKey))
               return false;

           //TODO
           return true;
       }


       [AllowAnonymous]
       [Route("Login")]
       [HttpPost]
       public HttpResponseMessage Login(HttpRequestMessage request, LoginModel obj)
       {
           return CreateHttpResponse(request, () =>
           {

               HttpResponseMessage response;

               ResultDTO result = ValidateLoginData(obj);
               if (result.StatusCode == Common.ConvertErrorCodeToInt(RetCode.ECS0000))
               {
                   result = _service.Login(obj);
                   response = request.CreateResponse(HttpStatusCode.OK, result);
               }
               else
               {
                   //TODO: alert error code
                   response = request.CreateResponse(HttpStatusCode.OK, result);
               }
               return response;
           });
       }

       [AllowAnonymous]
       [Route("Register")]
       [HttpPost]
       public HttpResponseMessage Register(HttpRequestMessage request, RegisterDTO obj)
       {
           return CreateHttpResponse(request, () =>
           {
               HttpResponseMessage response = null;

               ResultDTO result = ValidateRegisterData(obj);
               if (result.StatusCode == Common.ConvertErrorCodeToInt(RetCode.ECS0000))
               {
                   response = request.CreateResponse(HttpStatusCode.OK, _service.Register(obj));
               }
               else
               {
                   //TODO: alert error code
                   response = request.CreateResponse(HttpStatusCode.OK, result);
               }
               return response;
           });
       }

       [AllowAnonymous]
       [Route("ChangePassword")]
       [HttpPost]
       public HttpResponseMessage ChangePassword(HttpRequestMessage request, ChangePasswordModel obj)
       {
           return CreateHttpResponse(request, () =>
           {
               HttpResponseMessage response;
               response = request.CreateResponse(HttpStatusCode.OK, new { ErrorCode = _service.ChangePassword(obj) });
               return response;
           });
       }

       [AllowAnonymous]
       [HttpGet]
       [Route("GetAccountInfo/{id:int}")]
       public HttpResponseMessage GetAccountInfo(HttpRequestMessage request, Account obj)
       {
           return CreateHttpResponse(request, () =>
           {
               HttpResponseMessage response = null;
               response = request.CreateResponse(HttpStatusCode.OK, _service.GetAccountInfo(obj.ID));
               return response;
           });
       }

       [AllowAnonymous]
       [Route("GetAllData")]
       [HttpPost]
       public HttpResponseMessage GetAllData(HttpRequestMessage request, Paging obj)
       {
           return CreateHttpResponse(request, () =>
           {
               HttpResponseMessage response = null;
               Account accInfo = new Account
               {
                   CreatedBy = obj.UserLogon,
                   UpdatedBy = obj.SessionKey
               };
               if (!VerifykAccessWithRoot(accInfo))
               {
                   return request.CreateResponse(HttpStatusCode.OK, new { ErrorCode = RetCode.ECS0002 });
               }
               var result = _service.GetAllData(obj);
               if (result != null)
               {
                   foreach (var item in result)
                   {
                       item.Password = string.Empty;
                   }

                   response = request.CreateResponse(HttpStatusCode.OK, new { ErrorCode = Common.ConvertErrorCodeToInt(RetCode.ECS0000), obj = result });
               }
               else
               {
                   // log exception and response with error
                   throw new ApiBusinessException(1002, System.Reflection.MethodBase.GetCurrentMethod().Name.Replace("_", "") + " Failed.", HttpStatusCode.Conflict);
               }
               return response;
           });
       }

        [AllowAnonymous]
        [Route("ActiveAccount")]
        [HttpPost]
        public HttpResponseMessage ActiveAccount(HttpRequestMessage request, ActiveAccountDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.ActiveAccount(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("ChangeAccountType")]
        [HttpPost]
        public HttpResponseMessage ChangeAccountType(HttpRequestMessage request, ChangeAccountTypeDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.ChangeAccountType(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("LockAccount")]
        [HttpPost]
        public HttpResponseMessage LockAccount(HttpRequestMessage request, LockAccountDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.LockAccount(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("LockAffilate")]
        [HttpPost]
        public HttpResponseMessage LockAffilate(HttpRequestMessage request, LockAffilateDTO obj)
        {   
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.LockAffilate(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("LogOut")]
        [HttpPost]
        public HttpResponseMessage LogOut(HttpRequestMessage request, LogoutDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response;
                response = request.CreateResponse(HttpStatusCode.OK, new { ErrorCode = _service.Logout(obj) });
                return response;
            });
        }   
    }
}

