/// <summary>
/// <author>Ngô Tấn Phúc</author>
/// <description>Created date: </description>
/// <revision history>Version: 1.0.1</revision history>
/// </summary>
namespace NextTech.ChaChing123.Business
{
    using System;
    using System.Linq;
    using NextTech.ChaChing123.Entities;
    using Common.Constants;
    using Data.Extensions;
    using MigraDoc.Rendering;
    using NextTech.ChaChing123.Common.Models;
    using NextTech.ChaChing123.Common.Utilities;
    using NextTech.ChaChing123.Core.Models;
    using NextTech.ChaChing123.Data.Infrastructure;
    using NextTech.ChaChing123.Data.Repositories;


    public class AffiliateComponent : IAffiliateService
    {
        #region Variables
        private readonly IEntityBaseRepository<Affiliate> _repository;
        private readonly IUnitOfWork _unitOfWork;
        #endregion

        public AffiliateComponent(IEntityBaseRepository<Affiliate> repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        public ResultDTO GetOrderList(OrderListSearchDto obj)
        {
            var a = _repository.GetOrderList(obj);
            //var result = _repository.GetAll().OrderByDescending(p => p.UserName).Skip(obj.PageIndex != 0 ? obj.PageIndex : 0).Take(obj.PageCount != 0 ? obj.PageCount : 10);
            //return result;
            return null;
        }

        public ResultDTO UpdatePaymentState(PaymentContractDTO obj)
        {
            ResultDTO accInfo = new ResultDTO();
            try
            {
                accInfo = _repository.UpdatePaymentState(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdatePaymentState", ActionType.Login, ex.Message.ToString());
                accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                accInfo.StatusMsg = ex.Message.ToString();
            }

            return accInfo;
        }


    }
}
