
using NextTech.ChaChing123.Data.Repositories;
using NextTech.ChaChing123.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using NextTech.ChaChing123.Services.WebApi.Infrastructure.Extensions;
using NextTech.ChaChing123.Business.Utilities;
using NextTech.ChaChing123.Data.Infrastructure;

namespace NextTech.ChaChing123.Services.WebApi.Infrastructure.Core
{
    public class ApiControllerBaseExtended : ApiController
    {
        protected List<Type> _requiredRepositories;

        protected readonly IDataRepositoryFactory _dataRepositoryFactory;

        protected IUnitOfWork _unitOfWork;

        private HttpRequestMessage RequestMessage;

        public ApiControllerBaseExtended(IDataRepositoryFactory dataRepositoryFactory, IUnitOfWork unitOfWork)
        {
            _dataRepositoryFactory = dataRepositoryFactory;
            _unitOfWork = unitOfWork;
        }

        protected HttpResponseMessage CreateHttpResponse(HttpRequestMessage request, List<Type> repos, Func<HttpResponseMessage> function)
        {
            HttpResponseMessage response = null;

            try
            {
                RequestMessage = request;
                InitRepositories(repos);
                response = function.Invoke();
            }
            catch (DbUpdateException ex)
            {
                LogError(ex);
                response = request.CreateResponse(HttpStatusCode.BadRequest, ex.InnerException.Message);
            }
            catch (Exception ex)
            {
                LogError(ex);
                response = request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

            return response;
        }
        
        private void InitRepositories(List<Type> entities)
        {
            /*
            _errorsRepository = _dataRepositoryFactory.GetDataRepository<Error>(RequestMessage);

            if (entities.Any(e => e.FullName == typeof(Movie).FullName))
            {
                _moviesRepository = _dataRepositoryFactory.GetDataRepository<Movie>(RequestMessage);
            }

            if (entities.Any(e => e.FullName == typeof(Rental).FullName))
            {
                _rentalsRepository = _dataRepositoryFactory.GetDataRepository<Rental>(RequestMessage);
            }

            if (entities.Any(e => e.FullName == typeof(Customer).FullName))
            {
                _customersRepository = _dataRepositoryFactory.GetDataRepository<Customer>(RequestMessage);
            }

            if (entities.Any(e => e.FullName == typeof(Stock).FullName))
            {
                _stocksRepository = _dataRepositoryFactory.GetDataRepository<Stock>(RequestMessage);
            }

            if (entities.Any(e => e.FullName == typeof(User).FullName))
            {
                _stocksRepository = _dataRepositoryFactory.GetDataRepository<Stock>(RequestMessage);
            }
            */
        }

        
        private void LogError(Exception ex)
        {
            Logger.Write("Error Message: " + ex.Message + Environment.NewLine + "Source: " + ex.Source + Environment.NewLine + "Stack Trace: " + ex.StackTrace + Environment.NewLine + "Stack Dump: " + ex.ToString(), "CRITICAL");

        }

    }
}