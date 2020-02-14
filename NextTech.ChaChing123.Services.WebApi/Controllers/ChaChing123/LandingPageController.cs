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
    using System.Web;
    using System;

    /// <summary>
    /// Class LandingPageController.
    /// </summary>
    /// <seealso cref="NextTech.ChaChing123.Services.WebApi.Infrastructure.Core.ApiControllerBase" />
    [SSLClientCertificateActionWebApiFilter]
    [RoutePrefix("api/LandingPage")]
    public class LandingPageController : ApiControllerBase
    {

        /// <summary>
        /// The service
        /// </summary>
        private readonly ILandingPageService _service;

        /// <summary>
        /// Initializes a new instance of the <see cref="LandingPageController"/> class.
        /// </summary>
        /// <param name="interfaceService">The interface service.</param>
        /// <param name="_unitOfWork">The unit of work.</param>
        public LandingPageController(ILandingPageService interfaceService, IUnitOfWork _unitOfWork)
            : base(_unitOfWork)
        {
            _service = interfaceService;
        }


        [AllowAnonymous]
        [Route("GetSoloInfoByShareCode")]
        [HttpPost]
        public HttpResponseMessage GetSoloInfoByShareCode(HttpRequestMessage request, RequestSoloByShareCodeDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {

                HttpResponseMessage response;
                ResultDTO result = _service.GetSoloInfoByShareCode(obj);
                response = request.CreateResponse(HttpStatusCode.OK, result);
                return response;
            });
        }


        [AllowAnonymous]
        [Route("GetDetailSoloPage")]
        [HttpPost]
        public HttpResponseMessage GetDetailSoloPage(HttpRequestMessage request, RequestViewDetaiDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response;

                ResultDTO result = _service.GetDetailSoloPage(obj);
                response = request.CreateResponse(HttpStatusCode.OK, result);
                return response;
            });
        }

        [AllowAnonymous]
        [Route("GetDetailSoloPageByID")]
        [HttpPost]
        public HttpResponseMessage GetDetailSoloPageByID(HttpRequestMessage request, RequestDetailByIDDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response;

                ResultDTO result = _service.GetDetailSoloPageByID(obj);
                response = request.CreateResponse(HttpStatusCode.OK, result);
                return response;
            });
        }

        [AllowAnonymous]
        [Route("GetAllSoloPage")]
        [HttpPost]
        public HttpResponseMessage GetAllSoloPage(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {

                HttpResponseMessage response;

                ResultDTO result = _service.GetAllSoloPage(obj);
                response = request.CreateResponse(HttpStatusCode.OK, result);
                return response;
            });
        }

        [AllowAnonymous]
        [Route("AddSoloPage")]
        [HttpPost]
        public HttpResponseMessage AddSoloPage(HttpRequestMessage request, SolaPageDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {

                HttpResponseMessage response;

                ResultDTO result = _service.AddSoloPage(obj);
                response = request.CreateResponse(HttpStatusCode.OK, result);
                return response;
            });
        }

        [AllowAnonymous]
        [Route("EditSoloPage")]
        [HttpPost]
        public HttpResponseMessage EditSoloPage(HttpRequestMessage request, SolaPageDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {

                HttpResponseMessage response;

                ResultDTO result = _service.EditSoloPage(obj);
                response = request.CreateResponse(HttpStatusCode.OK, result);
                return response;
            });
        }

        [AllowAnonymous]
        [Route("DeleteSoloPage")]
        [HttpPost]
        public HttpResponseMessage DeleteSoloPage(HttpRequestMessage request, RequestViewDetaiDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {

                HttpResponseMessage response;

                ResultDTO result = _service.DeleteSoloPage(obj);
                response = request.CreateResponse(HttpStatusCode.OK, result);
                return response;
            });
        }

        [AllowAnonymous]
        [Route("GetDetailFunnalPage")]
        [HttpPost]
        public HttpResponseMessage GetDetailFunnalPage(HttpRequestMessage request, RequestViewDetaiDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response;
                ResultDTO result = _service.GetDetailFunnalPage(obj);
                response = request.CreateResponse(HttpStatusCode.OK, result);
                return response;
            });
        }

        [AllowAnonymous]
        [Route("GetAllFunnalPage")]
        [HttpPost]
        public HttpResponseMessage GetAllFunnalPage(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {

                HttpResponseMessage response;

                ResultDTO result = _service.GetAllFunnalPage(obj);
                response = request.CreateResponse(HttpStatusCode.OK, result);
                return response;
            });
        }

        [AllowAnonymous]
        [Route("AddFunnalPage")]
        [HttpPost]
        public HttpResponseMessage AddFunnalPage(HttpRequestMessage request, RequestFunnalPageDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {

                HttpResponseMessage response;

                ResultDTO result = _service.AddFunnalPage(obj);
                response = request.CreateResponse(HttpStatusCode.OK, result);
                return response;
            });
        }

        [AllowAnonymous]
        [Route("EditFunnalPage")]
        [HttpPost]
        public HttpResponseMessage EditFunnalPage(HttpRequestMessage request, RequestFunnalPageDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {

                HttpResponseMessage response;

                ResultDTO result = _service.EditFunnalPage(obj);
                response = request.CreateResponse(HttpStatusCode.OK, result);
                return response;
            });
        }

        [AllowAnonymous]
        [Route("DeleteFunnalPage")]
        [HttpPost]
        public HttpResponseMessage DeleteFunnalPage(HttpRequestMessage request, RequestViewDetaiDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {

                HttpResponseMessage response;

                ResultDTO result = _service.DeleteFunnalPage(obj);
                response = request.CreateResponse(HttpStatusCode.OK, result);
                return response;
            });
        }

        [AllowAnonymous]
        [Route("GetDetailFunnalPageByID")]
        [HttpPost]
        public HttpResponseMessage GetDetailFunnalPageByID(HttpRequestMessage request, RequestDetailByIDDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response;

                ResultDTO result = _service.GetDetailFunnalPageByID(obj);
                response = request.CreateResponse(HttpStatusCode.OK, result);
                return response;
            });
        }

        [AllowAnonymous]
        [Route("GetTitleTemplate")]
        [HttpPost]
        public HttpResponseMessage GetTitleTemplate(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {

                HttpResponseMessage response;

                ResultDTO result = _service.GetTitleTemplate(obj);
                response = request.CreateResponse(HttpStatusCode.OK, result);
                return response;
            });
        }

        [AllowAnonymous]
        [Route("GetSubTitleTemplate")]
        [HttpPost]
        public HttpResponseMessage GetSubTitleTemplate(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {

                HttpResponseMessage response;

                ResultDTO result = _service.GetSubTitleTemplate(obj);
                response = request.CreateResponse(HttpStatusCode.OK, result);
                return response;
            });
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("UploadFile")]
        public HttpResponseMessage UploadFile(HttpRequestMessage request)
        {
            ResultDTO result = new ResultDTO();
            var requestContext = HttpContext.Current.Request;
            var pathFolder = Common.GetConfigValue("PathFileOfLandingPage");

            if (!System.IO.Directory.Exists(pathFolder))
                System.IO.Directory.CreateDirectory(pathFolder);

            string sessionKey = requestContext.Form.Get("SessionKey");

            result= Common.CheckLogin(sessionKey);
            if (result.StatusCode != 0)
            {
                return CreateHttpResponse(request, () =>
                {
                    var response = request.CreateResponse(HttpStatusCode.OK, result);
                    return response;
                });
            }

            try
            {
                if (requestContext.Files.Count < 1)
                {
                    result.StatusCode = int.Parse(RetCodeMsg.ECS0028, 0);
                    result.SetContentMsg();
                }
                else
                {
                    string fileName = requestContext.Files[0].FileName;
                    string ext = System.IO.Path.GetExtension(fileName);
                    string originalFileName = System.IO.Path.GetFileName(fileName);

                    // Save to file temp
                    var tempFileName = Guid.NewGuid() + ext;

                    //To save file, use SaveAs method
                    if (System.IO.File.Exists(pathFolder + tempFileName))
                    {
                        System.IO.File.Delete(pathFolder + tempFileName);
                    }

                    //File will be saved in application root
                    requestContext.Files[0].SaveAs(pathFolder + tempFileName);

                    result.StatusCode = 0;
                    result.SetContentMsg();
                    result.Details = tempFileName;
                }
            }
            catch(Exception ex)
            {
                result.StatusCode =9999 ;
                result.Details = ex.Message;

                return CreateHttpResponse(request, () =>
                {
                    var response = request.CreateResponse(HttpStatusCode.OK, result);
                    return response;
                });
            }

            return CreateHttpResponse(request, () =>
            {
                var response = request.CreateResponse(HttpStatusCode.OK, result);
                return response;
            });
        }
    }
}

