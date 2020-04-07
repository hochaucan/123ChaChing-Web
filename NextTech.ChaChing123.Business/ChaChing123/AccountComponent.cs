
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
    /// Class AccountComponent.
    /// </summary>
    /// <seealso cref="NextTech.ChaChing123.Business.IAccountService" />
    public class AccountComponent : IAccountService
    {
        #region Variables
        /// <summary>
        /// The repository
        /// </summary>
        private readonly IEntityBaseRepository<Account> _repository;
        /// <summary>
        /// The unit of work
        /// </summary>
        private readonly IUnitOfWork _unitOfWork;
        #endregion

        /// <summary>
        /// Initializes a new instance of the <see cref="AccountComponent"/> class.
        /// </summary>
        /// <param name="repository">The repository.</param>
        /// <param name="unitOfWork">The unit of work.</param>
        public AccountComponent(IEntityBaseRepository<Account> repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        #region IAccountService Implementation
        /// <summary>
        /// Gets the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>Account.</returns>
        public Account Get(int id)
        {
            var result = _repository.GetSingle(id);
            return result;
        }

        public ResultDTO CheckLogin(CheckLoginDTO obj)
        {
            ResultDTO accInfo = new ResultDTO();
            try
            {
                accInfo = _repository.CheckLogin(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("CheckLogin", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                accInfo.StatusMsg = ex.Message.ToString();
            }

            return accInfo;
        }

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
                accInfo.StatusMsg= ex.Message.ToString();
            }

            return accInfo;
        }

        public ResultDTO Register(RegisterDTO obj)
        {
            ResultDTO errorCode=new ResultDTO();
            try
            {
                var lengthPass = int.Parse(Common.Utilities.Common.GetConfigValue("LengthPass"));
                obj.ContractNo = PasswordGenerator.generatePassword(lengthPass, false, true, false);
                obj.Password = Common.Utilities.Common.StringToMD5Hash(obj.Password);
                errorCode = _repository.Register(obj);

            }
            catch (Exception e)
            {
                Utilities.AppLog.WriteLog("Register", ActionType.Add, e.Message, obj.CreatedBy);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = e.Message.ToString();
            }
            return errorCode;
        }

        public ResultDTO Edit(RequestEditAccountDTO obj)
        {
            ResultDTO accInfo = new ResultDTO();
            try
            {
                accInfo = _repository.EditAccount(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("EditAccount", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                accInfo.StatusMsg = ex.Message.ToString();
            }

            return accInfo;
        }

        public ResultDTO Delete(DeleteAccountDTO obj)
        {
            ResultDTO accInfo = new ResultDTO();
            try
            {
                accInfo = _repository.DeleteAccount(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("DeleteAccount", ActionType.Delete, ex.Message.ToString(),obj.SessionKey);
                accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                accInfo.SetContentMsg();
            }

            return accInfo;
        }

        public IQueryable<Account> GetAllData(Paging obj)
        {
            var result = _repository.GetAll().OrderByDescending(p => p.UserName).Skip(obj.PageIndex!=0? obj.PageIndex:0).Take(obj.PageCount != 0 ? obj.PageCount :10);
            return result;
        }

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

        public ResultDTO Logout(LogoutDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode= _repository.LogOut(obj);
                
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("Logout", ActionType.Logout, ex.Message.ToString(),obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;

        }

        public ResultDTO GetAccountInfo(RequestDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetAccountInfo(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAccountInfo", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;

        }
        public ResultDTO RequestAccountType(RequestAccountTypeDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.RequestAccountType(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("RequestAccountType", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;

        }
        public ResultDTO UpdateAvatar(RequestUpdateAvatarDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.UpdateAvatar(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdateAvatar", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;

        }

        #region Leads
        public ResultDTO AddLeadsByAccount(RegisterLeadBySoloPageDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.AddLeadsByAccount(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("AddLeadsByAccount", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;

        }
        public ResultDTO UpdateLeadsByAccount(RegisterLeadBySoloPageDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.UpdateLeadsByAccount(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdateLeadsByAccount", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;

        }
        public ResultDTO UpdateLeadsTypeByAccount(RegisterLeadBySoloPageDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.UpdateLeadsTypeByAccount(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdateLeadsTypeByAccount", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;

        }
        public ResultDTO GetLeadsDetailByAccount(RegisterLeadBySoloPageDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetLeadsDetailByAccount(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetLeadsDetailByAccount", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;

        }
        public ResultDTO GetAllLeadsByAccount(LeadsDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetAllLeadsByAccount(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllLeadsByAccount", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;

        }
        
        public ResultDTO SummaryLeadsReportByAccount(SummaryRequestDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                obj.StartList = Utilities.Common.GeStartListByYear(obj.YearList);
                obj.EndList = Utilities.Common.GeEndListByYear(obj.YearList);
                rsInfo = _repository.SummaryLeadsReportByAccount(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("SummaryLeadsReportByAccount", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;

        }
        public ResultDTO SummaryLeadsChartByAccount(SummaryRequestDTO obj)
        {
            ResultDTO rsInfo = new ResultDTO();
            try
            {
                obj.StartList = Utilities.Common.GeStartListByYear(obj.YearList);
                obj.EndList = Utilities.Common.GeEndListByYear(obj.YearList);
                rsInfo = _repository.SummaryLeadsChartByAccount(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("SummaryLeadsChartByAccount", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                rsInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                rsInfo.StatusMsg = ex.Message.ToString();
            }

            return rsInfo;

        }


        #endregion

        
        public ResultDTO UpdateMailChimpInfoByAccount(MailChimpRequestDTO obj)
        {
            ResultDTO result = new ResultDTO();
            try
            {
                result = _repository.UpdateMailChimpInfoByAccount(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdateMailChimpInfoByAccount", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                result.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                result.StatusMsg = ex.Message.ToString();
            }

            return result;

        }

        public ResultDTO GetMailChimpInfoByAccount(RequestDTO obj)
        {
            ResultDTO result = new ResultDTO();
            try
            {
                result = _repository.GetMailChimpInfoByAccount(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetMailChimpInfoByAccount", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                result.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                result.StatusMsg = ex.Message.ToString();
            }

            return result;

        }

        public ResultDTO UpdateBanner(RequestUpdateDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.UpdateBanner(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("UpdateBanner", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                errorCode.StatusMsg = ex.Message.ToString();
            }

            return errorCode;

        }
        public ResultDTO GetBannerLink(RequestDTO obj)
        {
            ResultDTO result = new ResultDTO();
            try
            {
                result = _repository.GetBannerLink(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetBannerLink", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                result.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                result.StatusMsg = ex.Message.ToString();
            }

            return result;

        }
        public ResultDTO GetMerchantInfo(SubmitPaymentDTO obj)
        {
            ResultDTO result = new ResultDTO();
            try
            {
                result = _repository.GetMerchantInfo(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("MerchantInfo", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                result.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                result.StatusMsg = ex.Message.ToString();
            }

            return result;

        }
        public ResultDTO RegisterForgetPassword(ForgetPasswordModel obj)
        {
            ResultDTO result = new ResultDTO();
            try
            {
                var lengthPass = int.Parse(Common.Utilities.Common.GetConfigValue("LengthPass"));
                obj.ActiveKey = PasswordGenerator.generatePassword(lengthPass, false, true, false);
                result = _repository.RegisterForgetPassword(obj);
                if (int.Parse(result.StatusCode.ToString(), 0) == 0)
                {
                    ForgetPasswordModel pushData = new ForgetPasswordModel();
                    pushData =(ForgetPasswordModel)result.Details;
                    Common.Utilities.Common.SendMailOlala(obj.Email, Common.Utilities.Common.GetConfigValue("FWPSubject"), Common.Utilities.Common.GetConfigValue("FWPMessage").Replace("{0}", pushData.ActiveKey).Replace("{1}", pushData.Email).Replace("{2}", pushData.UserName));
                }
                result.Details = string.Empty;
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("RegisterForgetPassword", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                result.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                result.StatusMsg = ex.Message.ToString();
                result.Details= string.Empty;
            }

            return result;

        }

        public ResultDTO ActiveAccountByForgetPassword(ForgetPasswordModel obj)
        {
            ResultDTO result = new ResultDTO();
            try
            {
                obj.NewPassword = Common.Utilities.Common.StringToMD5Hash(obj.NewPassword);
                result = _repository.ActiveAccountByForgetPassword(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("ActiveAccountByForgetPassword", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                result.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                result.StatusMsg = ex.Message.ToString();
            }

            return result;

        }
        #endregion

    }
}
