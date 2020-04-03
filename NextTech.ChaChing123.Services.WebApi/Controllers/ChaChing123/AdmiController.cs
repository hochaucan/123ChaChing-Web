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

        [AllowAnonymous]
        [HttpPost]
        [Route("CheckLogin")]
        public HttpResponseMessage CheckLogin(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, Common.CheckLogin(obj));
                return response;
            });
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
        public HttpResponseMessage GetAccountList(HttpRequestMessage request, RequestOrderListDTO obj)
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
                if (string.IsNullOrEmpty(obj.PaymentState) || obj.PaymentState == "-1")
                {
                    obj.PaymentState = "1,2,3";
                }
                if (string.IsNullOrEmpty(obj.AffiliateState) || obj.AffiliateState == "-1")
                {
                    obj.AffiliateState = "1,2,3";
                }
                if (string.IsNullOrEmpty(obj.AffiliateAccount) || obj.AffiliateAccount == "-1")
                {
                    obj.AffiliateAccount = "";
                }
                if (string.IsNullOrEmpty(obj.KeyWord))
                {
                    obj.KeyWord = "";
                }
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
        public HttpResponseMessage SetPasswodForAccount(HttpRequestMessage request, ChangePasswordModel obj)
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
        [Route("GetAffiliateList")]
        [HttpPost]
        public HttpResponseMessage GetAffiliateList(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAffiliateList(obj));
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
        public HttpResponseMessage SumaryReportChart(HttpRequestMessage request, SummaryRequestDTO obj)
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
        [AllowAnonymous]
        [Route("ApprovetWithDrawallInfoByAccount")]
        [HttpPost]
        public HttpResponseMessage ApprovetWithDrawallInfoByAccount(HttpRequestMessage request, WithdrawaltDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.ApprovetWithDrawallInfoByAccount(obj));
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

        #region Leads
        [AllowAnonymous]
        [Route("GetAllLeads")]
        [HttpPost]
        public HttpResponseMessage GetAllLeads(HttpRequestMessage request, LeadsFilterModel obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (string.IsNullOrEmpty(obj.KeyWord))
                {
                    obj.KeyWord = "";
                }
                if (string.IsNullOrEmpty(obj.LeadType) || obj.LeadType == "-1")
                {
                    obj.LeadType = "0,1,2,3";
                }
                if (string.IsNullOrEmpty(obj.LeadStatus) || obj.LeadStatus == "-1")
                {
                    obj.LeadStatus = "0,1,2";
                }
                if (string.IsNullOrEmpty(obj.AffiliateAccount))
                {
                    obj.AffiliateAccount = "";
                }
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAllLeads(obj));
                return response;
            });
        }
        #endregion

        #region [QuickReplies]
        [AllowAnonymous]
        [Route("GetAllQuickReplies")]
        [HttpPost]
        public HttpResponseMessage GetAllQuickReplies(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAllQuickReplies(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("AddQuickReplies")]
        [HttpPost]
        public HttpResponseMessage AddQuickReplies(HttpRequestMessage request, BOQuickRepliesItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.AddQuickReplies(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("UpdateQuickRepliesByID")]
        [HttpPost]
        public HttpResponseMessage UpdateQuickRepliesByID(HttpRequestMessage request, BOQuickRepliesItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.UpdateQuickRepliesByID(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("DeleteQuickRepliesByID")]
        [HttpPost]
        public HttpResponseMessage DeleteQuickRepliesByID(HttpRequestMessage request, RequestViewDetaiDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.DeleteQuickRepliesByID(obj));
                return response;
            });
        }
        #endregion

        #region [Script]
        [AllowAnonymous]
        [Route("GetAllScript")]
        [HttpPost]
        public HttpResponseMessage GetAllScript(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAllScript(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("AddScript")]
        [HttpPost]
        public HttpResponseMessage AddScript(HttpRequestMessage request, BOScriptItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.AddScript(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("UpdateScriptByID")]
        [HttpPost]
        public HttpResponseMessage UpdateScriptByID(HttpRequestMessage request, BOScriptItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.UpdateScriptByID(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("DeleteScriptByID")]
        [HttpPost]
        public HttpResponseMessage DeleteScriptByID(HttpRequestMessage request, RequestViewDetaiDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.DeleteScriptByID(obj));
                return response;
            });
        }
        #endregion
        #region [Rebuttals]
        [AllowAnonymous]
        [Route("GetAllRebuttals")]
        [HttpPost]
        public HttpResponseMessage GetAllRebuttals(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAllRebuttals(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("AddRebuttals")]
        [HttpPost]
        public HttpResponseMessage AddRebuttals(HttpRequestMessage request, BORebuttalsItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.AddRebuttals(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("UpdateRebuttalsByID")]
        [HttpPost]
        public HttpResponseMessage UpdateRebuttalsByID(HttpRequestMessage request, BORebuttalsItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.UpdateRebuttalsByID(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("DeleteRebuttalsByID")]
        [HttpPost]
        public HttpResponseMessage DeleteRebuttalsByID(HttpRequestMessage request, RequestViewDetaiDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.DeleteRebuttalsByID(obj));
                return response;
            });
        }
        #endregion

        #region [Documents]
        [AllowAnonymous]
        [Route("GetAllDocuments")]
        [HttpPost]
        public HttpResponseMessage GetAllDocuments(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAllDocuments(obj));
                return response;
            });
        }
        [AllowAnonymous]
        [Route("GetAllDocumentsByAccount")]
        [HttpPost]
        public HttpResponseMessage GetAllDocumentsByAccount(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAllDocumentsByAccount(obj));
                return response;
            });
        }
        
        [AllowAnonymous]
        [Route("AddDocuments")]
        [HttpPost]
        public HttpResponseMessage AddDocuments(HttpRequestMessage request, BODocumentsItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.AddDocuments(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("UpdateDocumentsByID")]
        [HttpPost]
        public HttpResponseMessage UpdateDocumentsByID(HttpRequestMessage request, BODocumentsItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.UpdateDocumentsByID(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("DeleteDocumentsByID")]
        [HttpPost]
        public HttpResponseMessage DeleteDocumentsByID(HttpRequestMessage request, RequestViewDetaiDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.DeleteDocumentsByID(obj));
                return response;
            });
        }
        #endregion

        #region [Document]
        [AllowAnonymous]
        [Route("GetAllDocument")]
        [HttpPost]
        public HttpResponseMessage GetAllDocument(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAllDocument(obj));
                return response;
            });
        }
        [AllowAnonymous]
        [Route("GetAllDocumentByCatID")]
        [HttpPost]
        public HttpResponseMessage GetAllDocumentByCatID(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAllDocumentByCatID(obj));
                return response;
            });
        }
        
        [AllowAnonymous]
        [Route("GetDocumentInfoByID")]
        [HttpPost]
        public HttpResponseMessage GetDocumentInfoByID(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetDocumentInfoByID(obj));
                return response;
            });
        }
        
        [AllowAnonymous]
        [Route("AddDocument")]
        [HttpPost]
        public HttpResponseMessage AddDocument(HttpRequestMessage request, BODocumentItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.AddDocument(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("UpdateDocumentByID")]
        [HttpPost]
        public HttpResponseMessage UpdateDocumentByID(HttpRequestMessage request, BODocumentItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.UpdateDocumentByID(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("DeleteDocumentByID")]
        [HttpPost]
        public HttpResponseMessage DeleteDocumentByID(HttpRequestMessage request, RequestViewDetaiDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.DeleteDocumentByID(obj));
                return response;
            });
        }
        #endregion
        #region [BlockTabMarketing]
        [AllowAnonymous]
        [Route("GetAllBlockTabMarketing")]
        [HttpPost]
        public HttpResponseMessage GetAllBlockTabMarketing(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAllBlockTabMarketing(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("AddBlockTabMarketing")]
        [HttpPost]
        public HttpResponseMessage AddBlockTabMarketing(HttpRequestMessage request, BOBlockTabMarketingItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.AddBlockTabMarketing(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("UpdateBlockTabMarketingByID")]
        [HttpPost]
        public HttpResponseMessage UpdateBlockTabMarketingByID(HttpRequestMessage request, BOBlockTabMarketingItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.UpdateBlockTabMarketingByID(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("DeleteBlockTabMarketingByID")]
        [HttpPost]
        public HttpResponseMessage DeleteBlockTabMarketingByID(HttpRequestMessage request, RequestViewDetaiDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.DeleteBlockTabMarketingByID(obj));
                return response;
            });
        }
        #endregion

        #region [Notification]
        [AllowAnonymous]
        [Route("GetAllNotification")]
        [HttpPost]
        public HttpResponseMessage GetAllNotification(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAllNotification(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("AddNotification")]
        [HttpPost]
        public HttpResponseMessage AddNotification(HttpRequestMessage request, BONotificationItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.AddNotification(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("UpdateNotificationByID")]
        [HttpPost]
        public HttpResponseMessage UpdateNotificationByID(HttpRequestMessage request, BONotificationItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.UpdateNotificationByID(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("DeleteNotificationByID")]
        [HttpPost]
        public HttpResponseMessage DeleteNotificationByID(HttpRequestMessage request, RequestViewDetaiDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.DeleteNotificationByID(obj));
                return response;
            });
        }
        #endregion
        #region [IntroPage]
        [AllowAnonymous]
        [Route("GetAllIntroPage")]
        [HttpPost]
        public HttpResponseMessage GetAllIntroPage(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAllIntroPage(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("AddIntroPage")]
        [HttpPost]
        public HttpResponseMessage AddIntroPage(HttpRequestMessage request, BOIntroPageItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.AddIntroPage(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("UpdateIntroPageByID")]
        [HttpPost]
        public HttpResponseMessage UpdateIntroPageByID(HttpRequestMessage request, BOIntroPageItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.UpdateIntroPageByID(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("DeleteIntroPageByID")]
        [HttpPost]
        public HttpResponseMessage DeleteIntroPageByID(HttpRequestMessage request, RequestViewDetaiDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.DeleteIntroPageByID(obj));
                return response;
            });
        }
        #endregion

        #region [Comment]
        [AllowAnonymous]
        [Route("GetAllComment")]
        [HttpPost]
        public HttpResponseMessage GetAllComment(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAllComment(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("AddComment")]
        [HttpPost]
        public HttpResponseMessage AddComment(HttpRequestMessage request, BOCommentItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.AddComment(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("UpdateCommentByID")]
        [HttpPost]
        public HttpResponseMessage UpdateCommentByID(HttpRequestMessage request, BOCommentItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.UpdateCommentByID(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("DeleteCommentByID")]
        [HttpPost]
        public HttpResponseMessage DeleteCommentByID(HttpRequestMessage request, RequestViewDetaiDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.DeleteCommentByID(obj));
                return response;
            });
        }
        #endregion

        #region [Question]
        [AllowAnonymous]
        [Route("GetAllQuestion")]
        [HttpPost]
        public HttpResponseMessage GetAllQuestion(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAllQuestion(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("AddQuestion")]
        [HttpPost]
        public HttpResponseMessage AddQuestion(HttpRequestMessage request, BOQuestionItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.AddQuestion(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("UpdateQuestionByID")]
        [HttpPost]
        public HttpResponseMessage UpdateQuestionByID(HttpRequestMessage request, BOQuestionItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.UpdateQuestionByID(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("DeleteQuestionByID")]
        [HttpPost]
        public HttpResponseMessage DeleteQuestionByID(HttpRequestMessage request, RequestViewDetaiDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.DeleteQuestionByID(obj));
                return response;
            });
        }
        #endregion

        #region [AffiliateLinks]
        [AllowAnonymous]
        [Route("GetAllAffiliateLinks")]
        [HttpPost]
        public HttpResponseMessage GetAllAffiliateLinks(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAllAffiliateLinks(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("AddAffiliateLinks")]
        [HttpPost]
        public HttpResponseMessage AddAffiliateLinks(HttpRequestMessage request, BOAffiliateLinksItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.AddAffiliateLinks(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("UpdateAffiliateLinksByID")]
        [HttpPost]
        public HttpResponseMessage UpdateAffiliateLinksByID(HttpRequestMessage request, BOAffiliateLinksItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.UpdateAffiliateLinksByID(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("DeleteAffiliateLinksByID")]
        [HttpPost]
        public HttpResponseMessage DeleteAffiliateLinksByID(HttpRequestMessage request, RequestViewDetaiDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.DeleteAffiliateLinksByID(obj));
                return response;
            });
        }
        #endregion

        #region [AffiliateLink]
        [AllowAnonymous]
        [Route("GetAllAffiliateLink")]
        [HttpPost]
        public HttpResponseMessage GetAllAffiliateLink(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAllAffiliateLink(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("AddAffiliateLink")]
        [HttpPost]
        public HttpResponseMessage AddAffiliateLink(HttpRequestMessage request, BOAffiliateLinkItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.AddAffiliateLink(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("UpdateAffiliateLinkByID")]
        [HttpPost]
        public HttpResponseMessage UpdateAffiliateLinkByID(HttpRequestMessage request, BOAffiliateLinkItemDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.UpdateAffiliateLinkByID(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("DeleteAffiliateLinkByID")]
        [HttpPost]
        public HttpResponseMessage DeleteAffiliateLinkByID(HttpRequestMessage request, RequestViewDetaiDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.DeleteAffiliateLinkByID(obj));
                return response;
            });
        }
        #endregion
        //ONStep 1:
        


    }
}

