using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using BTMU.APF.Core.Logging;
using BTMU.APF.Core.Models;
using NextTech.ChaChing123.Common.Utilities;

namespace NextTech.ChaChing123.UI.Web.Infrastructure.Core
{
    public class ApiControllerBase : ApiController
    {
        public ApiControllerBase()
        {

        }

        protected HttpResponseMessage CreateHttpResponse(HttpRequestMessage request, Func<HttpResponseMessage> function)
        {
            HttpResponseMessage response = null;

            try
            {
                response = function.Invoke();
            }
            catch (DbUpdateException ex)
            {
                string errorMessage = FormatLogMessage(ex, "ERR0002", "Db Update Exception occured.");
                Logger.Write(errorMessage, TraceEventType.CRITICAL);
                response = request.CreateResponse(HttpStatusCode.BadRequest, ex.InnerException.Message);
            }
            catch (System.Data.Entity.Validation.DbEntityValidationException ex)
            {
                string errMsg = string.Empty;

                try
                {
                    if (ex.EntityValidationErrors != null)
                    {
                        foreach (var eve in ex.EntityValidationErrors)
                        {
                            errMsg += "Entity of type \"" + eve.Entry.Entity.GetType().Name + "\" in state \"" + eve.Entry.State + "\" has the following validation errors:";

                            foreach (var ve in eve.ValidationErrors)
                            {
                                errMsg += "- Property: \"" + ve.PropertyName + "\", Error: \"" + ve.ErrorMessage + "\"";
                            }
                        }

                    }
                }
                catch { }


                string errorMessage = FormatLogMessage(ex, "ERR0005", "Db Entity Validation Exception occured: " + errMsg);
                Logger.Write(errorMessage, TraceEventType.CRITICAL);
                response = request.CreateResponse(HttpStatusCode.BadRequest, ex.InnerException.Message);
            }
            catch (ApplicationException ex)
            {

                if (ex.Message == NextTech.ChaChing123.Common.Resources.Resource.E0004 || ex.Message == "E0004" || ex.Message == "ERR0004")
                {
                    // begin Release Package APF V2.02.0005 20170622
                    string errorMessage = FormatLogMessage(ex, "ERR0004", "Application Exception occured.");
                    Logger.Write(errorMessage, TraceEventType.ERROR);

                    Status status = new Status();
                    status.StatusCode = 412;
                    status.StatusMsg = ex.Message;
                    response = request.CreateResponse(HttpStatusCode.OK, new { success = false, Status = status });
                }
                else
                {
                    string errorMessage = FormatLogMessage(ex, "ERR0003", "Application Exception occured.");
                    Logger.Write(errorMessage, TraceEventType.CRITICAL);
                    response = request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);

                }

            }
            catch (Exception ex)
            {
                string errorMessage = FormatLogMessage(ex, "ERR0001", "Exception occured.");
                Logger.Write(errorMessage, TraceEventType.CRITICAL); // this is a CRITICAL Error
                if (ex.Message.Contains(((int)HttpStatusCode.RequestTimeout).ToString()))
                {
                    response = request.CreateResponse(HttpStatusCode.RequestTimeout, "Data is processing. Please try again later.");
                }
                else
                {
                    response = request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                }
            }

            return response;
        }

        protected string GetUserOperationUnit()
        {
            return GetOperationUnitFromHeader();
        }

        private string GetOperationUnitFromHeader()
        {

            var re = Request;
            var headers = re.Headers;
            string token = string.Empty;

            if (headers.Contains("X-Operation-Unit"))
            {
                token = headers.GetValues("X-Operation-Unit").First();
                if (string.IsNullOrEmpty(token))
                {
                    // if not in header, get from query string
                    try
                    {
                        token = HttpContext.Current.Request["x_operation_unit"].ToString();
                    }
                    catch
                    {
                        token = "";
                    }
                }
            }

            return token;

        }

        private void LogError(Exception ex, bool isCritical)
        {
            string userName = HttpContext.Current.User.Identity.Name;
            Logger.Write("User Name: " + userName + Environment.NewLine + "Error Message: " + ex.Message + Environment.NewLine + "Source: " + ex.Source + Environment.NewLine + "Stack Trace: " + ex.StackTrace + Environment.NewLine + "Stack Dump: " + ex.ToString(), TraceEventType.CRITICAL);
        }

        private void LogError(Exception ex)
        {
            try
            {

                string userName = HttpContext.Current.User.Identity.Name;
                Logger.Write("User Name: " + userName + Environment.NewLine + "Error Message: " + ex.Message + Environment.NewLine + "Source: " + ex.Source + Environment.NewLine + "Stack Trace: " + ex.StackTrace + Environment.NewLine + "Stack Dump: " + ex.ToString(), TraceEventType.ERROR);
            }
            catch { }
        }

        private string FormatLogMessage(Exception ex, string errorCode, string additionalErrorMessage)
        {
            try
            {
                string userName = HttpContext.Current.User.Identity.Name;
                string errorMessage = string.Empty;
                errorMessage += "User Name: " + userName;
                errorMessage = Environment.NewLine + "Error Code: " + errorCode;
                errorMessage += Environment.NewLine + "Error Message: " + additionalErrorMessage;
                errorMessage += Environment.NewLine + ex.Message;
                errorMessage += Environment.NewLine + "Source: " + ex.Source;
                errorMessage += Environment.NewLine + "Stack Trace: " + ex.StackTrace;
                errorMessage += Environment.NewLine + "Stack Dump: " + ex.ToString();
                return errorMessage;
            }
            catch
            {

                return "";
            }
        }

        public class AddFileModel<T>
        {
            private T value;
            public AddFileModel(T _value)
            {
                value = _value;
            }

            //public void SetFileModel<U>(ref U file) where U : FileModel
            //{
            //    HttpRequest httprequest = value as HttpRequest;
            //    var HttpPostedFile = httprequest.Files["fileByte"];
            //    file.ContentLength = HttpPostedFile.ContentLength;
            //    file.ContentType = HttpPostedFile.ContentType;
            //    FileExtensions<string> fileExt = new FileExtensions<string>(null);
            //    file.FileContent = fileExt.ConvertStreamToArray(HttpPostedFile.InputStream);
            //    file.FileName = HttpContext.Current.Request.Form["name"];
            //    file.FileSize = HttpContext.Current.Request.Form["size"];
            //    file.Url = HttpContext.Current.Request.Form["url"];
            //    file.Remarks = HttpContext.Current.Request.Form["remarks"];
            //}

            //public void SetFileModel<U>(ref U file, int i) where U : FileModel
            //{
            //    HttpRequest httprequest = value as HttpRequest;
            //    var HttpPostedFile = httprequest.Files["fileByte_" + i.ToString()];
            //    file.ContentLength = HttpPostedFile.ContentLength;
            //    file.ContentType = HttpPostedFile.ContentType;
            //    FileExtensions<string> fileExt = new FileExtensions<string>(null);
            //    file.FileContent = fileExt.ConvertStreamToArray(HttpPostedFile.InputStream);
            //    file.FileName = HttpContext.Current.Request.Form["name_" + i.ToString()];
            //    file.FileSize = HttpContext.Current.Request.Form["size_" + i.ToString()];
            //    file.Url = HttpContext.Current.Request.Form["url_" + i.ToString()];
            //    file.Remarks = HttpContext.Current.Request.Form["remarks_" + i.ToString()];
            //}
        }
    }
}