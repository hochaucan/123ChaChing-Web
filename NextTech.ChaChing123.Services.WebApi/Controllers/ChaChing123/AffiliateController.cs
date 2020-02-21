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
    using NextTech.ChaChing123.Services.WebApi.Models;
    using System.Collections.Generic;
    using System.Linq;

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
        public HttpResponseMessage GetWithDrawallInfoByAccount(HttpRequestMessage request, RequestWithdrawalDTO obj)
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
        public HttpResponseMessage GetSummaryReportByAccount(HttpRequestMessage request, SummaryRequestDTO obj)
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

        [AllowAnonymous]
        [Route("GetAfiliateListByAccount")]
        [HttpPost]
        public HttpResponseMessage GetAfiliateListByAccount(HttpRequestMessage request, RequestOrderListDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAfiliateListByAccount(obj));
                return response;
            });
        }
        
        [AllowAnonymous]
        [Route("getaffiliatecomission")]
        [HttpPost]
        public PagedResult<AffiliateOfMonth> GetAffiliateComissions(AffiliateModel affiliateModel)
        {
            // Determine the number of records to skip
            //int skip = (pageNo - 1) * pageSize;
            int pageNo = affiliateModel.PageNo;
            int pageSize = affiliateModel.PageSize;
            int skip = (pageNo - 1) * pageSize;

            // Get the total number of records
            var commissions = new List<AffiliateOfMonth>
            {
                new AffiliateOfMonth{ Date = "01/2020", Comission = "8,997,000", ComissionThanks = "8,997,000" },
                new AffiliateOfMonth{ Date = "12/2019", Comission = "8,997,000", ComissionThanks = "8,997,000" },
                new AffiliateOfMonth{ Date = "11/2019", Comission = "8,997,000", ComissionThanks = "8,997,000" },
                new AffiliateOfMonth{ Date = "10/2019", Comission = "8,997,000", ComissionThanks = "8,997,000" },
                new AffiliateOfMonth{ Date = "09/2019", Comission = "8,997,000", ComissionThanks = "8,997,000" },
                new AffiliateOfMonth{ Date = "07/2019", Comission = "8,997,000", ComissionThanks = "8,997,000" },
                new AffiliateOfMonth{ Date = "06/2019", Comission = "8,997,000", ComissionThanks = "8,997,000" },
                new AffiliateOfMonth{ Date = "05/2019", Comission = "8,997,000", ComissionThanks = "8,997,000" },
                new AffiliateOfMonth{ Date = "04/2019", Comission = "8,997,000", ComissionThanks = "8,997,000" },
                new AffiliateOfMonth{ Date = "03/2019", Comission = "8,997,000", ComissionThanks = "8,997,000" },
                new AffiliateOfMonth{ Date = "02/2019", Comission = "8,997,000", ComissionThanks = "8,997,000" },
                new AffiliateOfMonth{ Date = "01/2019", Comission = "8,997,000", ComissionThanks = "8,997,000" }
            };

            int totalItemCount = commissions.Count();

            // Retrieve the customers for the specified page
            var affiliates = commissions
                .OrderBy(c => c.Date)
                .Skip(skip)
                .Take(pageSize)
                .ToList();

            // Return the paged results
            return new PagedResult<AffiliateOfMonth>(affiliates, pageNo, pageSize, totalItemCount);
        }
    }
}
