/// <summary>
/// <author>Ngô Tấn Phúc</author>
/// <description>Created date: </description>
/// <revision history>Version: 1.0.1</revision history>
/// </summary>

namespace NextTech.ChaChing123.Services.WebApi.Controllers
{
    using NextTech.ChaChing123.Common.Models;
    using NextTech.ChaChing123.Core.Models;
    using NextTech.ChaChing123.Data.Infrastructure;
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
    /// Class AdminController.
    /// </summary>
    /// <seealso cref="NextTech.ChaChing123.Services.WebApi.Infrastructure.Core.ApiControllerBase" />
    [SSLClientCertificateActionWebApiFilter]
    [RoutePrefix("api/Admin")]
    public class AdminController : ApiControllerBase
    {

        /// <summary>
        /// The service
        /// </summary>
        private readonly IAdminService _service;

        /// <summary>
        /// Initializes a new instance of the <see cref="AdminController"/> class.
        /// </summary>
        /// <param name="interfaceService">The interface service.</param>
        /// <param name="_unitOfWork">The unit of work.</param>
        public AdminController(IAdminService interfaceService, IUnitOfWork _unitOfWork)
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
                resul.StatusCode = Common.ConvertErrorCodeToInt(RetCode.ECS0001);
                resul.SetContentMsg();
            }

            else if (string.IsNullOrEmpty(obj.FullName))
            {
                resul.StatusCode = Common.ConvertErrorCodeToInt(RetCode.ECS0002);
                resul.SetContentMsg();
            }

            else if (string.IsNullOrEmpty(obj.Email))
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
        private bool VerifykAccessWithRoot(Admin obj)
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

        /*
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
                response = request.CreateResponse(HttpStatusCode.OK, _service.LockAffialate(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("GetOrderList")]
        [HttpPost]
        public HttpResponseMessage GetOrderList(HttpRequestMessage request, RequestOrderListDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetOrderList(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("UpdatePaymentState")]
        [HttpPost]
        public HttpResponseMessage UpdatePaymentState(HttpRequestMessage request, PaymentContractDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.UpdatePaymentState(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("UpdatePaymentAffiliateState")]
        [HttpPost]
        public HttpResponseMessage UpdatePaymentAffiliateState(HttpRequestMessage request, PaymentAffiliateDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.UpdatePaymentAffiliateState(obj));
                return response;
            });
        }
        */
      

        #region Account & Affialate
        // No.1
        [AllowAnonymous]
        [Route("GetAccountList")]
        [HttpPost]
        public HttpResponseMessage GetAccountList(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAccountList(obj));
                return response;
            });
        }
        // No.2
        [AllowAnonymous]
        [Route("GetOrderList")]
        [HttpPost]
        public HttpResponseMessage GetOrderList(HttpRequestMessage request, RequestOrderListDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetOrderList(obj));
                return response;
            });
        }
        // No.3
        [AllowAnonymous]
        [Route("GetAffialateList")]
        [HttpPost]
        public HttpResponseMessage GetAffialateList(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAffialateList(obj));
                return response;
            });
        }
        // No.4
        [AllowAnonymous]
        [Route("UpdatePaymentState")]
        [HttpPost]
        public HttpResponseMessage UpdatePaymentState(HttpRequestMessage request, PaymentContractDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.UpdatePaymentState(obj));
                return response;
            });
        }
        // No.5
        [AllowAnonymous]
        [Route("UpdatePaymentAffiliateState")]
        [HttpPost]
        public HttpResponseMessage UpdatePaymentAffiliateState(HttpRequestMessage request, PaymentAffiliateDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.UpdatePaymentAffiliateState(obj));
                return response;
            });
        }
        // No.6
        [AllowAnonymous]
        [Route("GetAccountInfo")]
        [HttpPost]
        public HttpResponseMessage GetAccountInfo(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAccountInfo(obj));
                return response;
            });
        }
        // No7=>TODO
        [AllowAnonymous]
        [Route("SetDefautAccount")]
        [HttpPost]
        public HttpResponseMessage SetDefautAccount(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.SetDefautAccount(obj));
                return response;
            });
        }
        // No8=>TODO
        [AllowAnonymous]
        [Route("SetPasswodForAccount")]
        [HttpPost]
        public HttpResponseMessage SetPasswodForAccount(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.SetPasswodForAccount(obj));
                return response;
            });
        }
        // No9=>TODO       
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
        // No.10=>TODO
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
        // No.11=>TODO
        [AllowAnonymous]
        [Route("LockAffialate")]
        [HttpPost]
        public HttpResponseMessage LockAffialate(HttpRequestMessage request, LockAffilateDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.LockAffialate(obj));
                return response;
            });
        }
        // No.12=>TODO
        [AllowAnonymous]
        [Route("GetAffiliateListByAccount")]
        [HttpPost]
        public HttpResponseMessage GetAffiliateListByAccount(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAffiliateListByAccount(obj));
                return response;
            });
        }
        // No.13
        [AllowAnonymous]
        [Route("UpdateAccountInfo")]
        [HttpPost]
        public HttpResponseMessage UpdateAccountInfo(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.UpdateAccountInfo(obj));
                return response;
            });
        }
        // No.14
        [AllowAnonymous]
        [Route("GetWithDrawallInfoByAccount")]
        [HttpPost]
        public HttpResponseMessage GetWithDrawallInfoByAccount(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetWithDrawallInfoByAccount(obj));
                return response;
            });
        }
        // No.15
        [AllowAnonymous]
        [Route("SummaryRevenueReport")]
        [HttpPost]
        public HttpResponseMessage SummaryRevenueReport(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.SummaryRevenueReport(obj));
                return response;
            });
        }
        // No.16
        [AllowAnonymous]
        [Route("SummaryCommissionReport")]
        [HttpPost]
        public HttpResponseMessage SummaryCommissionReport(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.SummaryCommissionReport(obj));
                return response;
            });
        }
        // No.17
        [AllowAnonymous]
        [Route("GetAllWithDrawallInfo")]
        [HttpPost]
        public HttpResponseMessage GetAllWithDrawallInfo(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAllWithDrawallInfo(obj));
                return response;
            });
        }
        // No.18
        [AllowAnonymous]
        [Route("SumaryReportChart")]
        [HttpPost]
        public HttpResponseMessage SumaryReportChart(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.SumaryReportChart(obj));
                return response;
            });
        }

        // No.19
        [AllowAnonymous]
        [Route("GetAllLead")]
        [HttpPost]
        public HttpResponseMessage GetAllLead(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAllLead(obj));
                return response;
            });
        }
        // No.20
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
        // No.21
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

        // No.22
        [AllowAnonymous]
        [Route("Logout")]
        [HttpPost]
        public HttpResponseMessage Logout(HttpRequestMessage request, LogoutDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.Logout(obj));
                return response;
            });
        }
        // No.23
        [AllowAnonymous]
        [Route("ChangePassword")]
        [HttpPost]
        public HttpResponseMessage ChangePassword(HttpRequestMessage request, ChangePasswordModel obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.ChangePassword(obj));
                return response;
            });
        }
        #endregion

        #region [TitleTemplate]
        [AllowAnonymous]
        [Route("AddTitleTemplate")]
        [HttpPost]
        public HttpResponseMessage AddTitleTemplate(HttpRequestMessage request, BOTitleTemplateDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.AddTitleTemplate(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("EditTitleTemplate")]
        [HttpPost]
        public HttpResponseMessage EditTitleTemplate(HttpRequestMessage request, BOTitleTemplateDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.EditTitleTemplate(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("DeleteTitleTemplate")]
        [HttpPost]
        public HttpResponseMessage DeleteTitleTemplate(HttpRequestMessage request, BOTitleTemplateDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.DeleteTitleTemplate(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("GetAllTitleTemplate")]
        [HttpPost]
        public HttpResponseMessage GetAllTitleTemplate(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAllTitleTemplate(obj));
                return response;
            });
        }
        #endregion

        #region [SubTitleTemplate]
        [AllowAnonymous]
        [Route("AddSubTitleTemplate")]
        [HttpPost]
        public HttpResponseMessage AddSubTitleTemplate(HttpRequestMessage request, BOTitleTemplateDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.AddSubTitleTemplate(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("EditSubTitleTemplate")]
        [HttpPost]
        public HttpResponseMessage EditSubTitleTemplate(HttpRequestMessage request, BOTitleTemplateDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.EditSubTitleTemplate(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("DeleteSubTitleTemplate")]
        [HttpPost]
        public HttpResponseMessage DeleteSubTitleTemplate(HttpRequestMessage request, BOTitleTemplateDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.DeleteSubTitleTemplate(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("GetAllSubTitleTemplate")]
        [HttpPost]
        public HttpResponseMessage GetAllSubTitleTemplate(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAllSubTitleTemplate(obj));
                return response;
            });
        }
        #endregion
    }
}

