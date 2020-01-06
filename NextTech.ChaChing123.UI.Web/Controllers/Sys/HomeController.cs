using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NextTech.ChaChing123.UI.Process;
using NextTech.ChaChing123.Common.Constants;
using System.Dynamic;
using NextTech.ChaChing123.UI.Web.Models;

namespace NextTech.ChaChing123.UI.Web.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            // get virtual directory
            string __virtualDirectory = System.Configuration.ConfigurationManager.AppSettings["virtualDirectory"];
            ViewBag.__virtualDirectory = __virtualDirectory;
            #region  check if user is authorized to access the application

            string operationUnit = string.Empty; // get all user roles for this user upon login
            // Note: you can set your authorization code here
            try
            {

                // 20170815 - last login date - must be before BTMU.APF.AspNetIdentity.Core.Users.Login();
                #region get the last login date
                DateTime lastLoginDate = DateTime.Now;
                //try
                //{
                //    lastLoginDate = BTMU.APF.AspNetIdentity.Core.Users.GetLastLoginDate();
                //}
                //catch
                //{
                //    lastLoginDate = DateTime.Now;
                //}
                #endregion

                // 20170815 - audit login
                #region Login 
                //BTMU.APF.Entities.UserProfile result = new BTMU.APF.Entities.UserProfile();
                //try
                //{
                //    result = BTMU.APF.AspNetIdentity.Core.Users.Login(operationUnit);
                //} 
                //catch
                //{
                //    result = BTMU.APF.AspNetIdentity.Core.Users.Get(operationUnit);
                //}
                #endregion

                var user = new UserLoginModel() { UserName = "chi.nguyenhuu", DisplayName = "Chi Nguyen", Unit = 11, Domain = "123ChaChing" };
                var authorizePermission = new List<string>(new string[] { "Checker", "Maker", "Admin" });
                var result = new UserProfileModel() { authorizePermission = authorizePermission, user = user, operationUnit = 11 };

                bool isAuthorized = false;

                //if (result != null)
                //{
                //    if (result.authorizePermission != null)
                //    {
                //        if (result.authorizePermission.Count > 0)
                //        {
                //            isAuthorized = true;

                //            #region check operation unit
                //            var userProfile = result;
                //            operationUnit = userProfile.user.Unit.ToString(); // initial business unit
                //            for (int i = 0; i < userProfile.authorizePermission.Count; i++)
                //            {
                //                var item = userProfile.authorizePermission[i];
                //                if (i == 0)
                //                {
                //                    operationUnit = item.OperationUnit;

                //                }
                //                if (item.IsMain == true)
                //                {
                //                    operationUnit = item.OperationUnit;
                //                    break;
                //                }
                //            }
                //            #endregion

                //        }
                //    }
                //}

                isAuthorized = true;


                #region find current date based on unit code

                var upc = new ApplicationProcessComponent();
                DateTime responseDate;
                decimal timezoneOffset = 7;  // default to singapore stardard time
                                             //if (string.IsNullOrEmpty(operationUnit))
                                             //{
                                             //    responseDate = upc.GetCurrentDate();
                                             //    timezoneOffset = upc.GetTimeZoneOffset("0003655");  // default to singapore stardard time
                                             //}
                                             //else
                                             //{
                                             //    responseDate = upc.GetCurrentDate(operationUnit);
                                             //    timezoneOffset = upc.GetTimeZoneOffset(operationUnit);
                                             //}
                responseDate = DateTime.Now;
                DateTime currentDate = responseDate; // DateTime.Now
                #endregion

                //ViewBag.__userProfile = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(result);
                JavaScriptExt<object> ext = new JavaScriptExt<object>(result);
                ViewBag.__userProfile = ext.getValue();

                ViewBag.__operationUnit = result.operationUnit;
                ViewBag.__localServerDate = currentDate.ToString("yyyy-MM-dd HH:mm:ss");  // or yyyy-MM-dd hh:MM:ss
                ViewBag.__localTimeZoneOffset = timezoneOffset.ToString();

                // 20170815 - last login date
                if (lastLoginDate > DateTime.Parse("1900-01-02")) // set to empty is date is 1900-01-01
                    ViewBag.__lastLoginDate = lastLoginDate.ToString("yyyy/MM/dd HH:mm:ss"); // date time 24 hrs format
                else
                    ViewBag.__lastLoginDate = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss");

                // isAuthorized = true; // for testing

                if (!isAuthorized)
                {
                    BTMU.APF.Utilities.Logging.Logger.Write("Unauthorized Access. UserID: " + result.user.Domain + @"\" + result.user.UserName, BTMU.APF.Core.Models.TraceEventType.ERROR);
                    return View("Unauthorized");
                }
            }
            catch (Exception ex)
            {

                BTMU.APF.Utilities.Logging.Logger.Write("Unauthorized Access. " + "Stack Dump: " + ex.ToString(), BTMU.APF.Core.Models.TraceEventType.ERROR);
                return View("Unauthorized");
            }

            #endregion

            return View();
        }
    }

    class JavaScriptExt<T>
    {
        private T val;
        public JavaScriptExt(T _value)
        {
            val = _value;
        }

        public string getValue()
        {
            return new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(val);
        }
    }
}