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
    using NextTech.ChaChing123.Services.WebApi.Infrastructure.Core;
    using NextTech.ChaChing123.Business;
    using NextTech.ChaChing123.Core.Filters;
    

    [SSLClientCertificateActionWebApiFilter] 
    [RoutePrefix("api/affiliate")]
    public class AffiliateController : ApiControllerBase
    {

        private readonly IAffiliateService _service;

        public AffiliateController(IAffiliateService interfaceService, IUnitOfWork _unitOfWork)
            : base(_unitOfWork)
        {
            _service = interfaceService;
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
        
        [AllowAnonymous]
        [Route("GetWalletInfoByAccount")]
        [HttpPost]
        public HttpResponseMessage GetWalletInfoByAccount(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetWalletInfoByAccount(obj));
                return response;
            });
        }
        
        [AllowAnonymous]
        [Route("GetAffiliateInfoByAccount")]
        [HttpPost]
        public HttpResponseMessage GetAffiliateInfoByAccount(HttpRequestMessage request, RequestAffiliateInfoDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAffiliateInfoByAccount(obj));
                return response;
            });
        }
        
        [AllowAnonymous]
        [Route("GetAffiliateCodeByAccount")]
        [HttpPost]
        public HttpResponseMessage GetAffiliateCodeByAccount(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAffiliateCodeByAccount(obj));
                return response;
            });
        }
        
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
        
        [AllowAnonymous]
        [Route("RequestWithDrawall")]
        [HttpPost]
        public HttpResponseMessage RequestWithDrawall(HttpRequestMessage request, RequestWithdrawalDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.RequestWithDrawall(obj));
                return response;
            });
        }
        
        [AllowAnonymous]
        [Route("GetSummaryReportByAccount")]
        [HttpPost]
        public HttpResponseMessage GetSummaryReportByAccount(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetSummaryReportByAccount(obj));
                return response;
            });
        }
        
        [AllowAnonymous]
        [Route("GetAfiliateAlertByAccount")]
        [HttpPost]
        public HttpResponseMessage GetAfiliateAlertByAccount(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAfiliateAlertByAccount(obj));
                return response;
            });
        }
    }
}
