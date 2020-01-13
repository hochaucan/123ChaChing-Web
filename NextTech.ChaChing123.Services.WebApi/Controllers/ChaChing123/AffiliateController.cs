/// <summary>
/// <author>Ngô Tấn Phúc</author>
/// <description>Created date: </description>
/// <revision history>Version: 1.0.1</revision history>
/// </summary>
using System.Linq;
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
    using System.Collections.Generic;
    using NextTech.ChaChing123.Services.WebApi.Models;

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
        public HttpResponseMessage GetOrderList(HttpRequestMessage request, OrderListSearchDto obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                //Account accInfo = new Account
                //{
                //    CreatedBy = obj.UserLogon,
                //    UpdatedBy = obj.SessionKey
                //};
                //if (!VerifykAccessWithRoot(accInfo))
                //{
                //    return request.CreateResponse(HttpStatusCode.OK, new { ErrorCode = RetCode.ECS0002 });
                //}
                var result = _service.GetOrderList(obj);
                if (result != null)
                {
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

        [Route("getcomission")]
        public HttpResponseMessage GetComissions(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                ResultDTO _objResponseModel = new ResultDTO();

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

                _objResponseModel.Details = commissions;
                _objResponseModel.StatusCode = 0;
                _objResponseModel.StatusMsg = "Lấy Thông Tin Thành Công";

                var result = _objResponseModel;
                if (result != null)
                {
                    response = request.CreateResponse(HttpStatusCode.OK, _objResponseModel);
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
