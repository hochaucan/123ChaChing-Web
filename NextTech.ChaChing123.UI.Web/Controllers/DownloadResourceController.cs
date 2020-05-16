using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace NextTech.ChaChing123.UI.Web.Controllers
{
    [RoutePrefix("api/downloadresource")]
    public class DownloadResourceController : ApiController
    {
        [AllowAnonymous]
        [Route("download")]
        [HttpGet]
        public HttpResponseMessage Download(string fileName)
        {
            try
            {
                if (!string.IsNullOrEmpty(fileName))
                {
                    string filePath = fileName;

                    using (MemoryStream ms = new MemoryStream())
                    {
                        using (FileStream file = new FileStream(filePath, FileMode.Open, FileAccess.Read))
                        {
                            byte[] bytes = new byte[file.Length];
                            file.Read(bytes, 0, (int)file.Length);
                            ms.Write(bytes, 0, (int)file.Length);

                            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
                            httpResponseMessage.Content = new ByteArrayContent(bytes.ToArray());
                            httpResponseMessage.Content.Headers.Add("x-filename", fileName);
                            httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                            httpResponseMessage.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                            httpResponseMessage.Content.Headers.ContentDisposition.FileName = fileName;
                            httpResponseMessage.StatusCode = HttpStatusCode.OK;
                            return httpResponseMessage;
                        }
                    }
                }
                return this.Request.CreateResponse(HttpStatusCode.NotFound, "File not found.");
            }
            catch (Exception ex)
            {
                return this.Request.CreateResponse(HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}
