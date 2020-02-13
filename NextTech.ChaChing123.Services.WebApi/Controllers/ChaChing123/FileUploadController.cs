using NextTech.ChaChing123.Business;
using NextTech.ChaChing123.Core.Filters;
using NextTech.ChaChing123.Data.Infrastructure;
using NextTech.ChaChing123.Services.WebApi.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NextTech.ChaChing123.Services.WebApi.Controllers.ChaChing123
{
    [SSLClientCertificateActionWebApiFilter]
    [RoutePrefix("api/fileupload")]
    public class FileUploadController : ApiControllerBase
    {
        private readonly IAffiliateService _service;

        public FileUploadController(IAffiliateService interfaceService, IUnitOfWork _unitOfWork)
            : base(_unitOfWork)
        {
            _service = interfaceService;
        }

        [AllowAnonymous]
        [Route("uploadfiles")]
        [HttpPost]
        public string UploadFile()
        {
            int iUploadedCnt = 0;

            // DEFINE THE PATH WHERE WE WANT TO SAVE THE FILES.
            string sPath = "";
            sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/");

            string sessionKey = System.Web.HttpContext.Current.Request.Form.Get("SessionKey");

            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;

            // CHECK THE FILE COUNT.
            for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)
            {
                System.Web.HttpPostedFile hpf = hfc[iCnt];

                if (hpf.ContentLength > 0)
                {
                    // CHECK IF THE SELECTED FILE(S) ALREADY EXISTS IN FOLDER. (AVOID DUPLICATE)
                    if (!File.Exists(sPath + Path.GetFileName(hpf.FileName)))
                    {
                        // SAVE THE FILES IN THE FOLDER.
                        hpf.SaveAs(sPath + Path.GetFileName(hpf.FileName));
                        iUploadedCnt = iUploadedCnt + 1;
                    }
                }
            }

            // RETURN A MESSAGE (OPTIONAL).
            if (iUploadedCnt > 0)
            {
                return iUploadedCnt + " Files Uploaded Successfully";
            }
            else
            {
                return "Upload Failed";
            }
        }
    }
}
