using NextTech.ChaChing123.Data.Repositories;
using NextTech.ChaChing123.Entities;
using NextTech.ChaChing123.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http.Dependencies;

namespace NextTech.ChaChing123.Services.WebApi.Infrastructure.Extensions
{
    public static class RequestMessageExtensions
    {

        internal static IAccountService GetMembershipService(this HttpRequestMessage request)
        {
            return request.GetService<IAccountService>();
        }


        internal static IEntityBaseRepository<T> GetDataRepository<T>(this HttpRequestMessage request) where T : class, IEntityBase, new()
        {
            return request.GetService<IEntityBaseRepository<T>>();
        }

        private static TService GetService<TService>(this HttpRequestMessage request)
        {
            IDependencyScope dependencyScope = request.GetDependencyScope();
            TService service = (TService)dependencyScope.GetService(typeof(TService));

            return service;
        }
    }
}