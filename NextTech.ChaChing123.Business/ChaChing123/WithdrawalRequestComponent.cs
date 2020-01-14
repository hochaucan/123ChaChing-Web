using NextTech.ChaChing123.Business.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NextTech.ChaChing123.Entities.ChaChing123;
using NextTech.ChaChing123.Data.Repositories;
using NextTech.ChaChing123.Data.Infrastructure;

namespace NextTech.ChaChing123.Business.ChaChing123
{
    public class WithdrawalRequestComponent : IWithdrawalRequestService
    {
        private readonly IEntityBaseRepository<RequestWithdrawalInfo> _repository;
        private readonly IUnitOfWork _unitOfWork;
        public WithdrawalRequestComponent(IEntityBaseRepository<RequestWithdrawalInfo> repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }
        
        public RequestWithdrawalInfo Add(RequestWithdrawalInfo obj)
        {
            obj.CreatedBy = "system";
            obj.CreatedDate = DateTime.Now; // DateTime.Now;
            obj.UpdatedBy = "system";
            obj.UpdatedDate = DateTime.Now; // DateTime.Now;
            var result = _repository.Add(obj, true);

            _unitOfWork.Commit();

            return result;
        }
    }
}
