
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
        public ResultDTO SetPasswodForAccount(ChangePasswordModel obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            ResultDTO accInfo = new ResultDTO();
            try
            {
                obj.NewPassword = Common.Utilities.Common.StringToMD5Hash(obj.NewPassword);
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
        public ResultDTO GetAffiliateList(RequestDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                rsInfo = _repository.GetAffiliateList(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAffiliateList", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;
        }
        // No.13
        public ResultDTO UpdateAccountInfo(BOAccountItem2DTO obj)
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
        public ResultDTO SumaryReportChart(SummaryRequestDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                obj.StartList = Utilities.Common.GeStartListByYear(obj.YearList);
                obj.EndList = Utilities.Common.GeEndListByYear(obj.YearList);
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
        public ResultDTO ApprovetWithDrawallInfoByAccount(WithdrawaltDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                //if(obj!=null&& obj.Status)
                errorCode = _repository.ApprovetWithDrawallInfoByAccount(obj);

            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("ApprovetWithDrawallInfoByAccount", ActionType.Logout, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;

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
        
        public ResultDTO GetAllLeads(LeadsFilterModel obj)
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

        #region [QuickReplies]
        // Get All QuickReplies
        public ResultDTO GetAllQuickReplies(RequestDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetAllQuickReplies(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllQuickReplies", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Add Item
        public ResultDTO AddQuickReplies(BOQuickRepliesItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.AddQuickReplies(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("AddQuickReplies", ActionType.Add, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Update Item By ID
        public ResultDTO UpdateQuickRepliesByID(BOQuickRepliesItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.UpdateQuickRepliesByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdateQuickRepliesByID", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Delete Item By ID
        public ResultDTO DeleteQuickRepliesByID(RequestViewDetaiDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.DeleteQuickRepliesByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("DeleteQuickRepliesByID", ActionType.Delete, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }

        public ResultDTO GetQuickRepliesInfoByID(RequestDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetQuickRepliesInfoByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetQuickRepliesInfoByID", ActionType.Delete, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        #endregion

        #region [Script]
        // Get All Script
        public ResultDTO GetAllScript(RequestDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetAllScript(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllScript", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Add Item
        public ResultDTO AddScript(BOScriptItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.AddScript(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("AddScript", ActionType.Add, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Update Item By ID
        public ResultDTO UpdateScriptByID(BOScriptItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.UpdateScriptByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdateScriptByID", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Delete Item By ID
        public ResultDTO DeleteScriptByID(RequestViewDetaiDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.DeleteScriptByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("DeleteScriptByID", ActionType.Delete, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        #endregion

        #region [Rebuttals]
        // Get All Rebuttals
        public ResultDTO GetAllRebuttals(RequestDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetAllRebuttals(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllRebuttals", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Add Item
        public ResultDTO AddRebuttals(BORebuttalsItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.AddRebuttals(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("AddRebuttals", ActionType.Add, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Update Item By ID
        public ResultDTO UpdateRebuttalsByID(BORebuttalsItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.UpdateRebuttalsByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdateRebuttalsByID", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Delete Item By ID
        public ResultDTO DeleteRebuttalsByID(RequestViewDetaiDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.DeleteRebuttalsByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("DeleteRebuttalsByID", ActionType.Delete, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        #endregion

        #region [Documents]
        // Get All Documents
        public ResultDTO GetAllDocuments(RequestDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetAllDocuments(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllDocuments", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        
        
        public ResultDTO GetAllDocumentsByAccount(RequestDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetAllDocumentsByAccount(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllDocumentsByAccount", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        
        // Add Item
        public ResultDTO AddDocuments(BODocumentsItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.AddDocuments(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("AddDocuments", ActionType.Add, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Update Item By ID
        public ResultDTO UpdateDocumentsByID(BODocumentsItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.UpdateDocumentsByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdateDocumentsByID", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Delete Item By ID
        public ResultDTO DeleteDocumentsByID(RequestViewDetaiDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.DeleteDocumentsByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("DeleteDocumentsByID", ActionType.Delete, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        #endregion

        #region [Document]
        // Get All Document
        public ResultDTO GetAllDocument(RequestDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetAllDocument(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllDocument", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        public ResultDTO GetAllDocumentByCatID(RequestDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetAllDocumentByCatID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllDocumentByCatID", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        public ResultDTO GetDocumentInfoByID(RequestDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetDocumentInfoByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetDocumentInfoByID", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        
        // Add Item
        public ResultDTO AddDocument(BODocumentItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.AddDocument(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("AddDocument", ActionType.Add, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Update Item By ID
        public ResultDTO UpdateDocumentByID(BODocumentItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.UpdateDocumentByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdateDocumentByID", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Delete Item By ID
        public ResultDTO DeleteDocumentByID(RequestViewDetaiDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.DeleteDocumentByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("DeleteDocumentByID", ActionType.Delete, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        #endregion

        #region [BlockTabMarketing]
        // Get All BlockTabMarketing
        public ResultDTO GetAllBlockTabMarketing(RequestDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetAllBlockTabMarketing(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllBlockTabMarketing", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Add Item
        public ResultDTO AddBlockTabMarketing(BOBlockTabMarketingItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.AddBlockTabMarketing(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("AddBlockTabMarketing", ActionType.Add, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Update Item By ID
        public ResultDTO UpdateBlockTabMarketingByID(BOBlockTabMarketingItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.UpdateBlockTabMarketingByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdateBlockTabMarketingByID", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Delete Item By ID
        public ResultDTO DeleteBlockTabMarketingByID(RequestViewDetaiDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.DeleteBlockTabMarketingByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("DeleteBlockTabMarketingByID", ActionType.Delete, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        #endregion

        #region [Notification]
        // Get All Notification
        public ResultDTO GetAllNotification(RequestDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetAllNotification(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllNotification", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Add Item
        public ResultDTO AddNotification(BONotificationItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.AddNotification(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("AddNotification", ActionType.Add, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Update Item By ID
        public ResultDTO UpdateNotificationByID(BONotificationItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.UpdateNotificationByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdateNotificationByID", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Delete Item By ID
        public ResultDTO DeleteNotificationByID(RequestViewDetaiDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.DeleteNotificationByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("DeleteNotificationByID", ActionType.Delete, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        #endregion
        #region [IntroPage]
        // Get All IntroPage
        public ResultDTO GetAllIntroPage(RequestDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetAllIntroPage(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllIntroPage", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Add Item
        public ResultDTO AddIntroPage(BOIntroPageItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.AddIntroPage(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("AddIntroPage", ActionType.Add, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Update Item By ID
        public ResultDTO UpdateIntroPageByID(BOIntroPageItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.UpdateIntroPageByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdateIntroPageByID", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Delete Item By ID
        public ResultDTO DeleteIntroPageByID(RequestViewDetaiDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.DeleteIntroPageByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("DeleteIntroPageByID", ActionType.Delete, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        #endregion
        #region [Comment]
        // Get All Comment
        public ResultDTO GetAllComment(RequestDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetAllComment(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllComment", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Add Item
        public ResultDTO AddComment(BOCommentItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.AddComment(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("AddComment", ActionType.Add, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Update Item By ID
        public ResultDTO UpdateCommentByID(BOCommentItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.UpdateCommentByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdateCommentByID", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Delete Item By ID
        public ResultDTO DeleteCommentByID(RequestViewDetaiDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.DeleteCommentByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("DeleteCommentByID", ActionType.Delete, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        #endregion

        #region [Question]
        // Get All Question
        public ResultDTO GetAllQuestion(RequestDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetAllQuestion(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllQuestion", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Add Item
        public ResultDTO AddQuestion(BOQuestionItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.AddQuestion(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("AddQuestion", ActionType.Add, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Update Item By ID
        public ResultDTO UpdateQuestionByID(BOQuestionItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.UpdateQuestionByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdateQuestionByID", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Delete Item By ID
        public ResultDTO DeleteQuestionByID(RequestViewDetaiDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.DeleteQuestionByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("DeleteQuestionByID", ActionType.Delete, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        #endregion

        #region [AffiliateLinks]
        // Get All AffiliateLinks
        public ResultDTO GetAllAffiliateLinks(RequestDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetAllAffiliateLinks(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllAffiliateLinks", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Add Item
        public ResultDTO AddAffiliateLinks(BOAffiliateLinksItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.AddAffiliateLinks(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("AddAffiliateLinks", ActionType.Add, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Update Item By ID
        public ResultDTO UpdateAffiliateLinksByID(BOAffiliateLinksItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.UpdateAffiliateLinksByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdateAffiliateLinksByID", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Delete Item By ID
        public ResultDTO DeleteAffiliateLinksByID(RequestViewDetaiDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.DeleteAffiliateLinksByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("DeleteAffiliateLinksByID", ActionType.Delete, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        #endregion

        #region [AffiliateLink]
        // Get All AffiliateLink
        public ResultDTO GetAllAffiliateLink(RequestDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetAllAffiliateLink(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllAffiliateLink", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Add Item
        public ResultDTO AddAffiliateLink(BOAffiliateLinkItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.AddAffiliateLink(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("AddAffiliateLink", ActionType.Add, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Update Item By ID
        public ResultDTO UpdateAffiliateLinkByID(BOAffiliateLinkItemDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.UpdateAffiliateLinkByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdateAffiliateLinkByID", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        // Delete Item By ID
        public ResultDTO DeleteAffiliateLinkByID(RequestViewDetaiDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.DeleteAffiliateLinkByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("DeleteAffiliateLinkByID", ActionType.Delete, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;
        }
        #endregion

        #region contactinfo
        public ResultDTO GetAllContactInfo(RequestDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetAllContactInfo(obj);

            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllContactInfo", ActionType.Logout, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;

        }
        public ResultDTO AddContactInfo(RequestContactInfoDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.AddContactInfo(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("AddContactInfo", ActionType.Logout, ex.Message.ToString(), "system");
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;

        }
        #endregion

        #region Config
        public ResultDTO GetConfigValueByKeys(RequestConfigDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetConfigValueByKeys(obj);

            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetConfigValueByKeys", ActionType.Logout, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;

        }
        public ResultDTO UpdateConfigValueByKey(RequestConfigDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.UpdateConfigValueByKey(obj);

            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdateConfigValueByKey", ActionType.Logout, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;

        }
        #endregion
        //ONStep 3:


        #endregion

    }
}
