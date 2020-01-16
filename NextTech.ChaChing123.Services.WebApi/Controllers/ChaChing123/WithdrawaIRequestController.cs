using NextTech.ChaChing123.Business.Abstract;
using NextTech.ChaChing123.Common.Models;
using NextTech.ChaChing123.Core.Filters;
using NextTech.ChaChing123.Data.Infrastructure;
using NextTech.ChaChing123.Entities.ChaChing123;
using NextTech.ChaChing123.Services.WebApi.Infrastructure.Core;
using NextTech.ChaChing123.Services.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NextTech.ChaChing123.Services.WebApi.Controllers.ChaChing123
{
    [SSLClientCertificateActionWebApiFilter]
    [RoutePrefix("api/withrawalrequest")]
    public class WithdrawalRequestController : ApiControllerBase
    {
        private readonly IWithdrawalRequestService _service;
        public WithdrawalRequestController(IWithdrawalRequestService service, IUnitOfWork _unitOfWork)
            : base(_unitOfWork)
        {
            _service = service;
        }

        [AllowAnonymous]
        [Route("add")]
        [HttpPost]
        public HttpResponseMessage Add(HttpRequestMessage request, RequestWithdrawalInfo obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                ResultDTO _objResponseModel = new ResultDTO();

                try
                {
                    if (ModelState.IsValid)
                    {
                        RequestWithdrawalInfo result = _service.Add(obj);

                        _objResponseModel.Details = result;
                        _objResponseModel.StatusCode = 0;
                        _objResponseModel.StatusMsg = "Yêu cầu rút tiền thành công";

                        response = request.CreateResponse(HttpStatusCode.OK, _objResponseModel);
                    }
                }
                catch (Exception)
                {

                    throw;
                }

                return response;
            });
        }
    }
}
