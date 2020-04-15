using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Filters;
using System.Web.Http;
using System.Web.Http.Tracing;
using System.ComponentModel.DataAnnotations;
using System.Net.Http;
using System.Net;

namespace NextTech.ChaChing123.UI.Web.ActionFilters
{
    /// <summary>
    /// Action filter to handle for Global application errors.
    /// </summary>
    public class GlobalExceptionAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            
        }
    }
}