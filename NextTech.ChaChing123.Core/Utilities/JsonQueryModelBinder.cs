using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Script.Serialization;
using System.Web.Http.ModelBinding;
using System.Web.Http.ValueProviders;
using System.Reflection;
using System.Collections;
using System.Text.RegularExpressions;

namespace NextTech.ChaChing123.Core
{
    public class JsonQueryModelBinder : IModelBinder
    {   
        //Implement base member
        public bool BindModel(HttpActionContext actionContext, ModelBindingContext bindingContext)
        {

            var kvps = actionContext.Request.GetQueryNameValuePairs().Take(1);
            var json = kvps.ElementAt(0).Value;
            var serializer = new JavaScriptSerializer();
            //serializer.MaxJsonLength = 12097152; //default: 2097152
            try
            {
                bindingContext.Model = serializer.Deserialize(json, bindingContext.ModelType);
                return true;
            }
            catch (Exception ex)
            {
                bindingContext.ModelState.AddModelError(
                    bindingContext.ModelName, ex.Message);
                return false;
            }
        }    
    }   
}
