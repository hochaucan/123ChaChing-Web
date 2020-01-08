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

    }
}
