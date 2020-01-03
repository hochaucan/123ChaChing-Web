using NextTech.ChaChing123.Data.Infrastructure;
using System;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using NextTech.ChaChing123.Core.Logging;
using NextTech.ChaChing123.Core.Models;
using NextTech.ChaChing123.Services.WebApi.Infrastructure.Extensions;

namespace NextTech.ChaChing123.Services.WebApi.Infrastructure.Core
{
    public class ApiControllerBase : ApiController
    {
        //protected readonly IEntityBaseRepository<Error> _errorsRepository;
        protected readonly IUnitOfWork _unitOfWork;

        public ApiControllerBase(IUnitOfWork unitOfWork)
        {
            //_errorsRepository = errorsRepository;
            _unitOfWork = unitOfWork;
        }

        public ApiControllerBase(IDataRepositoryFactory dataRepositoryFactory, IUnitOfWork unitOfWork)
        {
            //_errorsRepository = errorsRepository;
            _unitOfWork = unitOfWork;
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
                LogError(ex);
                response = request.CreateResponse(HttpStatusCode.BadRequest, ex.InnerException.Message);
            }
            catch (ApplicationException ex)
            {
                LogError(ex);
                response = request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                LogError(ex, true);
                response = request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

            return response;
        }

        private void LogError(Exception ex, bool isCritical)
        {
            string logInfo = "Error Message: " + ex.Message + Environment.NewLine + "Source: " + ex.Source + Environment.NewLine + "Stack Trace: " + ex.StackTrace + Environment.NewLine + "Stack Dump: " + ex.ToString();
            Logger.Write(logInfo, TraceEventType.CRITICAL);
        }

        private void LogError(Exception ex)
        {
            Logger.Write("Error Message: " + ex.Message + Environment.NewLine + " Source: " + ex.Source + Environment.NewLine + " Stack Trace: " + ex.StackTrace + Environment.NewLine + " Stack Dump: " + ex.ToString(), TraceEventType.ERROR);
            /*
            try
            {
                Error _error = new Error()
                {
                    Message = ex.Message,
                    StackTrace = ex.StackTrace,
                    DateCreated = DateTime.Now
                };

                _errorsRepository.Add(_error);
                _unitOfWork.Commit();
            }
            catch { }
            */
        }
    }
}