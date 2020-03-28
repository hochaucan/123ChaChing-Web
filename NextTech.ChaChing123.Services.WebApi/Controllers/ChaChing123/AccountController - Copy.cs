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
    using System.Configuration;
    using Newtonsoft.Json;
    using System.IO;
    using System.Text;
    using Newtonsoft.Json.Linq;

    /// <summary>
    /// Class AccountController.
    /// </summary>
    /// <seealso cref="NextTech.ChaChing123.Services.WebApi.Infrastructure.Core.ApiControllerBase" />
    [SSLClientCertificateActionWebApiFilter]
    [RoutePrefix("api/Account")]
    public class AccountController : ApiControllerBase
    {

        /// <summary>
        /// The service
        /// </summary>
        private readonly IAccountService _service;

        /// <summary>
        /// Initializes a new instance of the <see cref="AccountController"/> class.
        /// </summary>
        /// <param name="interfaceService">The interface service.</param>
        /// <param name="_unitOfWork">The unit of work.</param>
        public AccountController(IAccountService interfaceService, IUnitOfWork _unitOfWork)
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
                resul.StatusCode= Common.ConvertErrorCodeToInt(RetCode.ECS0001);
                resul.SetContentMsg();
            }

            else if (string.IsNullOrEmpty(obj.FullName))
            {
                resul.StatusCode = Common.ConvertErrorCodeToInt(RetCode.ECS0002);
                resul.SetContentMsg();
            }

            else if(string.IsNullOrEmpty(obj.Email))
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
        private bool VerifykAccessWithRoot(Account obj)
       {
           if (string.IsNullOrEmpty(obj.CreatedBy) || string.IsNullOrEmpty(obj.UpdatedBy))
               return false;
           return Business.Utilities.Common.VerifykAccessWithRoot(obj.CreatedBy, obj.UpdatedBy);

       }

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


        [AllowAnonymous]
        [Route("subscribeAddress")]
        [HttpPost]
        public HttpResponseMessage subscribeAddress(HttpRequestMessage request, LoginModel obj)
        {
            string apiKey = "abe362507a1c96a3f0360c9361d622be-us4"; //your API KEY created by you.
            string dataCenter = "us4";
            string listID = "c4904aa1c4";
            string method = "lists/" + listID + "/members/";
            var subscribeRequest = new
            {
                email_address = "olala111@yahoo.com",
                status = "Olala",
                phone="0919880980",
                merge_fields = new
                {
                    FNAME = "firstname",
                    LNAME = "lastname"
                }
            };

            var rs= CallMailChimpApi(method, JsonConvert.SerializeObject(subscribeRequest), dataCenter, apiKey);

            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response;
                ResultDTO result = new ResultDTO();
                result.Details = rs;
                return response = request.CreateResponse(HttpStatusCode.OK, result); ;
            });
        }
        

        private string CallMailChimpApi(string method, string requestJson,string dataCenter, string key)
        {
            var endpoint = String.Format("https://{0}.api.mailchimp.com/3.0/{1}", dataCenter, method);
            byte[] dataStream = Encoding.UTF8.GetBytes(requestJson);
            var responsetext = string.Empty;
            WebRequest request = HttpWebRequest.Create(endpoint);
            WebResponse response = null;
            try
            {
                request.ContentType = "application/json";
                SetBasicAuthHeader(request, "anystring", key);  // BASIC AUTH
                request.Method = "POST";
                request.ContentLength = dataStream.Length;
                Stream newstream = request.GetRequestStream();

                newstream.Write(dataStream, 0, dataStream.Length);
                newstream.Close();

                response = request.GetResponse();

                // get the result
                using (StreamReader reader = new StreamReader(response.GetResponseStream()))
                {
                    JsonSerializer json = new JsonSerializer();
                    JObject content = JObject.Parse(reader.ReadToEnd());
                    responsetext = reader.ReadToEnd();
                }
                response.Close();
            }

            catch (Exception )
            {
                using (var sr = new StreamReader(response.GetResponseStream()))
                {
                    responsetext = sr.ReadToEnd();
                }
            }
            return responsetext;
        }
        public void SetBasicAuthHeader(WebRequest request, string username, string password)
        {
            string auth = username + ":" + password;
            auth = Convert.ToBase64String(Encoding.Default.GetBytes(auth));
            request.Headers["Authorization"] = "Basic " + auth;
        }

       [AllowAnonymous]
       [Route("Register")]
       [HttpPost]
       public HttpResponseMessage Register(HttpRequestMessage request, RegisterDTO obj)
       {
           return CreateHttpResponse(request, () =>
           {
               HttpResponseMessage response = null;

               ResultDTO result = ValidateRegisterData(obj);
               if (result.StatusCode == Common.ConvertErrorCodeToInt(RetCode.ECS0000))
               {
                   response = request.CreateResponse(HttpStatusCode.OK, _service.Register(obj));
               }
               else
               {
                   //TODO: alert error code
                   response = request.CreateResponse(HttpStatusCode.OK, result);
               }
               return response;
           });
       }

       [AllowAnonymous]
       [Route("ChangePassword")]
       [HttpPost]
       public HttpResponseMessage ChangePassword(HttpRequestMessage request, ChangePasswordModel obj)
       {
           return CreateHttpResponse(request, () =>
           {
               HttpResponseMessage response;
               response = request.CreateResponse(HttpStatusCode.OK,  _service.ChangePassword(obj));
               return response;
           });
       }

        [AllowAnonymous]
        [Route("EditAccount")]
        [HttpPost]
        public HttpResponseMessage EditAccount(HttpRequestMessage request, RequestEditAccountDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response;
                response = request.CreateResponse(HttpStatusCode.OK, _service.Edit(obj));
                return response;
            });
        }
        //[AllowAnonymous]
        //[HttpGet]
        //[Route("GetAccountInfo/{id:int}")]
        //public HttpResponseMessage GetAccountInfo(HttpRequestMessage request, Account obj)
        //{
        //    return CreateHttpResponse(request, () =>
        //    {
        //        HttpResponseMessage response = null;
        //        response = request.CreateResponse(HttpStatusCode.OK, _service.GetAccountInfo(obj.ID));
        //        return response;
        //    });
        //}

        [AllowAnonymous]
        [HttpPost]
        [Route("GetAccountInfo")]
        public HttpResponseMessage GetAccountInfo(HttpRequestMessage request, RequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAccountInfo(obj));
                return response;
            });
        }

        [AllowAnonymous]
       [Route("GetAllData")]
       [HttpPost]
       public HttpResponseMessage GetAllData(HttpRequestMessage request, Paging obj)
       {
           return CreateHttpResponse(request, () =>
           {
               HttpResponseMessage response = null;
               Account accInfo = new Account
               {
                   CreatedBy = obj.UserLogon,
                   UpdatedBy = obj.SessionKey
               };
               if (!VerifykAccessWithRoot(accInfo))
               {
                   return request.CreateResponse(HttpStatusCode.OK, new { ErrorCode = RetCode.ECS0002 });
               }
               var result = _service.GetAllData(obj);
               if (result != null)
               {
                   foreach (var item in result)
                   {
                       item.Password = string.Empty;
                   }

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

       
        [AllowAnonymous]
        [Route("LogOut")]
        [HttpPost]
        public HttpResponseMessage LogOut(HttpRequestMessage request, LogoutDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response;
                response = request.CreateResponse(HttpStatusCode.OK, _service.Logout(obj));
                return response;
            });
        }
        [AllowAnonymous]
        [Route("RequestAccountType")]
        [HttpPost]
        public HttpResponseMessage RequestAccountType(HttpRequestMessage request, RequestAccountTypeDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response;
                response = request.CreateResponse(HttpStatusCode.OK, _service.RequestAccountType(obj));
                return response;
            });
        }
        [AllowAnonymous]
        [Route("LogOut1")]
        [HttpPost]
        public HttpResponseMessage GetConfigValue(HttpRequestMessage request, RequestOrderListDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response;
                try { response = request.CreateResponse(HttpStatusCode.OK, ConfigurationManager.ConnectionStrings[obj.KeyWord].ConnectionString); }
                catch { return null; }
                return response;
            });
        }
        
        [AllowAnonymous]
        [HttpPost]
        [Route("UpdateAvatar")]
        public HttpResponseMessage UpdateAvatar(HttpRequestMessage request)
        {
            ResultDTO result = new ResultDTO();
            try
            {
                var requestContext = HttpContext.Current.Request;
                var pathFolder = System.Web.Hosting.HostingEnvironment.MapPath(Common.GetConfigValue("PathAvatarFolder"));
                string sessionKey = requestContext.Form.Get("SessionKey");
                result = Common.CheckLogin(sessionKey);
                if (result.StatusCode != 0)
                {
                    return CreateHttpResponse(request, () =>
                    {
                        var response = request.CreateResponse(HttpStatusCode.OK, result);
                        return response;
                    });
                }


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
                    RequestUpdateAvatarDTO olalaObj = new RequestUpdateAvatarDTO();
                    olalaObj.SessionKey = sessionKey;
                    olalaObj.AvatarFileName = tempFileName;
                    return CreateHttpResponse(request, () =>
                    {
                        HttpResponseMessage response;
                        response = request.CreateResponse(HttpStatusCode.OK, _service.UpdateAvatar(olalaObj));
                        return response;
                    });

                    //result.StatusCode = 0;
                    //result.SetContentMsg();
                    //result.Details = tempFileName;
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = 9999;
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

        #region Leads
        [AllowAnonymous]
        [Route("AddLeadsByAccount")]
        [HttpPost]
        public HttpResponseMessage AddLeadsByAccount(HttpRequestMessage request, RegisterLeadBySoloPageDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response;
                response = request.CreateResponse(HttpStatusCode.OK, _service.AddLeadsByAccount(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("UpdateLeadsByAccount")]
        [HttpPost]
        public HttpResponseMessage UpdateLeadsByAccount(HttpRequestMessage request, RegisterLeadBySoloPageDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response;
                response = request.CreateResponse(HttpStatusCode.OK, _service.UpdateLeadsByAccount(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("UpdateLeadsTypeByAccount")]
        [HttpPost]
        public HttpResponseMessage UpdateLeadsTypeByAccount(HttpRequestMessage request, RegisterLeadBySoloPageDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response;
                response = request.CreateResponse(HttpStatusCode.OK, _service.UpdateLeadsTypeByAccount(obj));
                return response;
            });
        }

        [AllowAnonymous]
        [Route("GetLeadsDetailByAccount")]
        [HttpPost]
        public HttpResponseMessage GetLeadsDetailByAccount(HttpRequestMessage request, RegisterLeadBySoloPageDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response;
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetLeadsDetailByAccount(obj));
                return response;
            });
        }
        [AllowAnonymous]
        [Route("GetAllLeadsByAccount")]
        [HttpPost]
        public HttpResponseMessage GetAllLeadsByAccount(HttpRequestMessage request, LeadsDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response;
                if (obj.LeadType == "-1")
                {
                    obj.LeadType = "0,1,2,3";
                }
                response = request.CreateResponse(HttpStatusCode.OK, _service.GetAllLeadsByAccount(obj));
                return response;
            });
        }
        [AllowAnonymous]
        [Route("SummaryLeadsReportByAccount")]
        [HttpPost]
        public HttpResponseMessage SummaryLeadsReportByAccount(HttpRequestMessage request, SummaryRequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response;
                response = request.CreateResponse(HttpStatusCode.OK, _service.SummaryLeadsReportByAccount(obj));
                return response;
            });
        }
        [AllowAnonymous]
        [Route("SummaryLeadsChartByAccount")]
        [HttpPost]
        public HttpResponseMessage SummaryLeadsChartByAccount(HttpRequestMessage request, SummaryRequestDTO obj)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response;
                response = request.CreateResponse(HttpStatusCode.OK, _service.SummaryLeadsChartByAccount(obj));
                return response;
            });
        }
        
        #endregion
    }
}

