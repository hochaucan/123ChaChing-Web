using MigraDoc.Rendering;
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
    using NextTech.ChaChing123.Business.Utilities;
    using NextTech.ChaChing123.Entities.ChaChing123;
    using System.Collections.Generic;
    using System.Security.Principal;

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

        public MembershipContext ValidateUser(string username, string password)
        {
            var membershipCtx = new MembershipContext();

            var user = _repository.GetSingleByUsername(username);
            if (user != null && isUserValid(user, password))
            {
                //var userRoles = GetUserRoles(user.UserName);
                membershipCtx.Account = user;
            }

            return membershipCtx;
        }

        private bool isPasswordValid(Account user, string password)
        {
            return string.Equals(NextTech.ChaChing123.Common.Utilities.Common.StringToMD5Hash(password), user.Password);
        }

        private bool isUserValid(Account user, string password)
        {
            if (isPasswordValid(user, password))
            {
                return true;
            }

            return false;
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
                Utilities.AppLog.WriteLog("CheckLogin", ActionType.Login, ex.Message.ToString());
            }

            return accInfo;
        }

        public Account Login(LoginModel obj)
        {
            Account accInfo = null;
            try
            {
                if (!string.IsNullOrEmpty(obj.UserName) && obj.LoginType == 1 && !string.IsNullOrEmpty(obj.Password))
                {
                    obj.Password = NextTech.ChaChing123.Common.Utilities.Common.StringToMD5Hash(obj.Password);
                }

                accInfo = _repository.Login(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("Login", ActionType.Login, ex.Message.ToString());
            }

            return accInfo;
        }

        public ResultDTO Register(RegisterDTO obj)
        {
            ResultDTO errorCode=new ResultDTO();
            try
            {
                //if (!Utilities.Common.IsValidEmail(obj.Email) || !Utilities.Common.IsValidEmail(obj.UserName))
                //{
                //    errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS0028);
                //    return errorCode;
                //}
                //else
                {
                    try
                    {
                        var lengthPass = int.Parse(NextTech.ChaChing123.Common.Utilities.Common.GetConfigValue("LengthPass"));
                        obj.ContractNo = PasswordGenerator.generatePassword(lengthPass, false, true, false);
                        obj.Password = NextTech.ChaChing123.Common.Utilities.Common.StringToMD5Hash(obj.Password);
                        errorCode = _repository.Register(obj);

                    }
                    catch (Exception e)
                    {
                        errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS0027);
                    }
                    errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS0000);
                }

            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("Register", ActionType.Add, ex.Message);
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS0001);
            }
            return errorCode;
        }

        public ResultDTO ActiveAccount(ActiveAccountDTO obj)
        {
            ResultDTO accInfo = new ResultDTO();
            try
            {
                accInfo = _repository.ActiveAccount(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("ActiveAccount", ActionType.Login, ex.Message.ToString());
            }

            return accInfo;
        }
        
        public ResultDTO Edit(EditAccountDTO obj)
        {
            ResultDTO accInfo = new ResultDTO();
            try
            {
                accInfo = _repository.EditAccount(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("EditAccount", ActionType.Update, ex.Message.ToString());
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
                Utilities.AppLog.WriteLog("DeleteAccount", ActionType.Update, ex.Message.ToString());
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
            ResultDTO errorCode = new ResultDTO();

            errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS0015);
            try
            {
                var accInfo = Get(obj.UserId);
               
                if (accInfo.Password == NextTech.ChaChing123.Common.Utilities.Common.StringToMD5Hash(obj.OldPassword))
                {
                    accInfo.UpdatedDate = DateTime.Now;
                    accInfo.Password = NextTech.ChaChing123.Common.Utilities.Common.StringToMD5Hash(obj.NewPassword);
                    _repository.Edit(accInfo);
                    _unitOfWork.Commit();
                    errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS0000); //(RetCode.ECS0028);//Cap nhat mat khau thanh cong!
                }
               
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("ChangePassword", ActionType.Update, ex.Message.ToString());
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS0001);
            }

            return errorCode;
        }

        public ResultDTO Logout(LogoutDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode.StatusCode = _repository.LogOut(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("Logout", ActionType.Logout, ex.Message.ToString());
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS0001);
            }

            return errorCode;

        }

        public ResultDTO ChangeAccountType(ChangeAccountTypeDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.ChangeAccountType(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("ChangeAccountType", ActionType.Logout, ex.Message.ToString());
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS0001);
            }

            return errorCode;

        }

        public ResultDTO LockAccount(LockAccountDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.LockAccount(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("LockAccount", ActionType.Logout, ex.Message.ToString());
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS0001);
            }

            return errorCode;

        }

        public ResultDTO LockAffilate(LockAffilateDTO obj)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.LockAffilate(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("LockAccount", ActionType.Logout, ex.Message.ToString());
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS0001);
            }

            return errorCode;

        }

       
        public ResultDTO GetAccountInfo(int id)
        {
            ResultDTO errorCode = new ResultDTO();
            try
            {
                errorCode = _repository.GetAccountInfo(id);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("LockAccount", ActionType.Logout, ex.Message.ToString());
                errorCode.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS0001);
            }

            return errorCode;

        }

        #endregion

    }
}
