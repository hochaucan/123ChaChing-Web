
using NextTech.ChaChing123.Common.Models;
using NextTech.ChaChing123.Common.Utilities;
using NextTech.ChaChing123.Core.Models;
using NextTech.ChaChing123.Data.Infrastructure;
using NextTech.ChaChing123.Data.Repositories;

namespace NextTech.ChaChing123.Business
{
    using System;
    using System.Linq;
    using NextTech.ChaChing123.Entities;
    using Common.Constants;
    using Data.Extensions;

    /// <summary>
    /// Class AdminComponent.
    /// </summary>
    /// <seealso cref="NextTech.ChaChing123.Business.IAdminService" />
    public class AdminComponent : IAdminService
    {
        #region Variables
        /// <summary>
        /// The repository
        /// </summary>
        private readonly IEntityBaseRepository<Admin> _repository;
        /// <summary>
        /// The unit of work
        /// </summary>
        private readonly IUnitOfWork _unitOfWork;
        #endregion

        /// <summary>
        /// Initializes a new instance of the <see cref="AdminComponent"/> class.
        /// </summary>
        /// <param name="repository">The repository.</param>
        /// <param name="unitOfWork">The unit of work.</param>
        public AdminComponent(IEntityBaseRepository<Admin> repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        #region IAdminService Implementation
        
        public ResultDTO GetAccountList(RequestOrderListDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                rsInfo = _repository.GetAccountList(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAccountList", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;
        }
        // No.2
        public ResultDTO GetOrderList(RequestOrderListDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                rsInfo = _repository.GetOrderList(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetOrderList", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;
        }
        // No.3
        public ResultDTO GetAffialateList(RequestDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                rsInfo = _repository.GetAffialateList(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAffialateList", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;
        }
        // No.4
        public ResultDTO UpdatePaymentState(PaymentContractDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                rsInfo = _repository.UpdatePaymentState(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdatePaymentState", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;
        }
        // No.5
        public ResultDTO UpdatePaymentAffiliateState(PaymentAffiliateDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                rsInfo = _repository.UpdatePaymentAffiliateState(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdatePaymentAffiliateState", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;
        }
        // No.6
        public ResultDTO GetAccountInfo(RequestDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                rsInfo = _repository.GetAccountInfo(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAccountInfo", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;
        }
        // No7=>TODO
        public ResultDTO SetDefautAccount(RequestDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                rsInfo = _repository.SetDefautAccount(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("SetDefautAccount", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;
        }
        // No8=>TODO
        public ResultDTO SetPasswodForAccount(RequestDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                rsInfo = _repository.SetPasswodForAccount(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("SetPasswodForAccount", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;
        }
        // No9=>TODO       
        public ResultDTO ChangeAccountType(ChangeAccountTypeDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                rsInfo = _repository.ChangeAccountType(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("ChangeAccountType", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;
        }

        // No.10=>TODO
        public ResultDTO LockAccount(LockAccountDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.LockAccount(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("LockAccount", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }
            return errorCode;
        }
        // No.11=>TODO
        public ResultDTO LockAffialate(LockAffilateDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                rsInfo = _repository.LockAffialate(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("LockAffialate", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;
        }
        // No.12=>TODO
        public ResultDTO GetAffiliateListByAccount(RequestDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                rsInfo = _repository.GetAffiliateListByAccount(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAffiliateListByAccount", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;
        }
        // No.13
        public ResultDTO UpdateAccountInfo(RequestDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                rsInfo = _repository.UpdateAccountInfo(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdateAccountInfo", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;
        }

        // No.14
        public ResultDTO GetWithDrawallInfoByAccount(RequestDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                rsInfo = _repository.GetWithDrawallInfoByAccount(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetWithDrawallInfoByAccount", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;
        }
        // No.15
        public ResultDTO SummaryRevenueReport(RequestDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                rsInfo = _repository.SummaryRevenueReport(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("SummaryRevenueReport", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;
        }
        // No.16
        public ResultDTO SummaryCommissionReport(RequestDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                rsInfo = _repository.SummaryCommissionReport(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("SummaryCommissionReport", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;

        }
        // No.17
        public ResultDTO GetAllWithDrawallInfo(RequestDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                rsInfo = _repository.GetAllWithDrawallInfo(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllWithDrawallInfo", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;
        }
        // No.18
        public ResultDTO SumaryReportChart(RequestDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                rsInfo = _repository.SumaryReportChart(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("SumaryReportChart", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;
        }
        // No.19
        public ResultDTO GetAllLead(RequestDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                rsInfo = _repository.GetAllLead(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllLead", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;
        }
        // No.20
        public ResultDTO ActiveAccount(ActiveAccountDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                rsInfo = _repository.ActiveAccount(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("ActiveAccount", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;
        }
        // No.21
        public ResultDTO Login(LoginModel obj)
        {
            ResultDTO accInfo = null;

            try
            {
                if (!string.IsNullOrEmpty(obj.UserName) && obj.LoginType == 1 && !string.IsNullOrEmpty(obj.Password))
                {
                    obj.Password = Common.Utilities.Common.StringToMD5Hash(obj.Password);
                }

                accInfo = _repository.Login(obj);


            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("Login", ActionType.Login, ex.Message.ToString(), obj.SessionKey);
                accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                accInfo.StatusMsg = ex.Message.ToString();
            }

            return accInfo;
        }

        // No.22
        public ResultDTO Logout(LogoutDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.LogOut(obj);

            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("Logout", ActionType.Logout, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;

        }
        // No.23
        public ResultDTO ChangePassword(ChangePasswordModel obj)
        {
            ResultDTO accInfo = new ResultDTO();
            try
            {
                obj.OldPassword = Common.Utilities.Common.StringToMD5Hash(obj.OldPassword);
                obj.NewPassword = Common.Utilities.Common.StringToMD5Hash(obj.NewPassword);

                accInfo = _repository.ChangePassword(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("ChangePassword", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                accInfo.SetContentMsg();
            }

            return accInfo;
        }
       

        #region [TitleTemplate]
        public ResultDTO AddTitleTemplate(BOTitleTemplateDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.AddTitleTemplate(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("AddTitleTemplate", ActionType.Add, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        public ResultDTO EditTitleTemplate(BOTitleTemplateDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.EditTitleTemplate(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("EditTitleTemplate", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        public ResultDTO DeleteTitleTemplate(BOTitleTemplateDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.DeleteTitleTemplate(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("DeleteTitleTemplate", ActionType.Delete, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        public ResultDTO GetAllTitleTemplate(RequestDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetAllTitleTemplate(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllTitleTemplate", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }

        #endregion

        #region [SubTitleTemplate]
        public ResultDTO AddSubTitleTemplate(BOTitleTemplateDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.AddSubTitleTemplate(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("AddSubTitleTemplate", ActionType.Add, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        public ResultDTO EditSubTitleTemplate(BOTitleTemplateDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.EditSubTitleTemplate(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("EditSubTitleTemplate", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        public ResultDTO DeleteSubTitleTemplate(BOTitleTemplateDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.DeleteSubTitleTemplate(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("DeleteSubTitleTemplate", ActionType.Delete, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        public ResultDTO GetAllSubTitleTemplate(RequestDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetAllSubTitleTemplate(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllSubTitleTemplate", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }

        #endregion
        #region Leads
        
        public ResultDTO GetAllLeads(LeadsDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetAllLeads(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllLeads", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        #endregion


        #endregion

    }
}
