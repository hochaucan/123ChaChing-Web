
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

        #endregion

    }
}
