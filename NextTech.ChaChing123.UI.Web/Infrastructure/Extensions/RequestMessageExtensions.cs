using NextTech.ChaChing123.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http.Dependencies;

namespace NextTech.ChaChing123.UI.Web.Infrastructure.Extensions
{
    public static class RequestMessageExtensions
    {
        internal static IAccountService GetMembershipService(this HttpRequestMessage request)
        {
            return request.GetService<IAccountService>();
        }

        private static TService GetService<TService>(this HttpRequestMessage request)
        {
            IDependencyScope dependencyScope = request.GetDependencyScope();
            TService service = (TService)dependencyScope.GetService(typeof(TService));

            return service;
        }
    }
}