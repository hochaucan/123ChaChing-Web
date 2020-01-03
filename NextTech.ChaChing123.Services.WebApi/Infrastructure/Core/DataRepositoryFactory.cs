using NextTech.ChaChing123.Data.Repositories;
using NextTech.ChaChing123.Services.WebApi.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Autofac;
using System.Web.Http;
using NextTech.ChaChing123.Services.WebApi.Infrastructure.Extensions;
using System.Net.Http;
using NextTech.ChaChing123.Entities;

namespace NextTech.ChaChing123.Services.WebApi.Infrastructure.Core
{
    public class DataRepositoryFactory : IDataRepositoryFactory
    {
        public IEntityBaseRepository<T> GetDataRepository<T>(HttpRequestMessage request) where T : class, IEntityBase, new()
        {
            return request.GetDataRepository<T>();
        }
    }

    public interface IDataRepositoryFactory
    {
        IEntityBaseRepository<T> GetDataRepository<T>(HttpRequestMessage request) where T : class, IEntityBase, new();
    }
}