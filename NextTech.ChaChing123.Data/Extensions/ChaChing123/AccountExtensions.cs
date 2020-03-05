

namespace NextTech.ChaChing123.Data.Extensions
{
    using NextTech.ChaChing123.Data.Repositories;
    using Entities;
    using System.Linq;
    using Core.Utilities.Security;
    using System;
    using System.Data.SqlClient;
    using NextTech.ChaChing123.Common.Models;
    using NextTech.ChaChing123.Core.Models;

    /// <summary>
    /// Class AccountExtensions.
    /// </summary>
    public static class AccountExtensions
    {
        public static ResultDTO CheckLogin(this IEntityBaseRepository<Account> repository, CheckLoginDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            if (string.IsNullOrEmpty(obj.UserName) || string.IsNullOrEmpty(obj.SessionKey))
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            }
            else
            {
                result.Details = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[CheckLogin] @UserName, @SessionKey, @errorCode out",
                        new SqlParameter("FullName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("UserName", DB.SafeSQL(obj.SessionKey)),
                        errorCode);
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();

            }
            return result;
        }

        public static ResultDTO Login(this IEntityBaseRepository<Account> repository, LoginModel obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            var fag = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_AccountLogin] @UserName, @Password, @SessionKey, @LoginType, @UserAdmin, @errorCode out",
                new SqlParameter("UserName", obj.UserName),
                new SqlParameter("Password", obj.Password),
                new SqlParameter("SessionKey", obj.SessionKey),
                new SqlParameter("LoginType", obj.LoginType),
                new SqlParameter("UserAdmin", obj.UserAdmin),
                errorCode);

            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            if (int.Parse(errorCode.Value.ToString(), 0) == 0 )
            {
                result.Details= GetAccountInfo(obj);
            }
            return result;
        }

        public static ResultDTO Register(this IEntityBaseRepository<Account> repository, RegisterDTO obj)
        {
            var result =new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                result.StatusCode = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_RegisterAccount] @FullName, @UserName, @Email, @Phone,@Password,@AccountType,@RefCode,@ContractNo,@CreatedBy, @errorCode out",
                new SqlParameter("FullName", DB.SafeSQL(obj.FullName)),
                new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                new SqlParameter("Email", DB.SafeSQL(obj.Email)),
                new SqlParameter("Phone", DB.SafeSQL(obj.Phone)),
                new SqlParameter("Password", DB.SafeSQL(obj.Password)),
                new SqlParameter("AccountType", obj.AccountType),
                new SqlParameter("RefCode", DB.SafeSQL(obj.RefCode)),
                new SqlParameter("ContractNo", DB.SafeSQL(obj.ContractNo)),
                new SqlParameter("CreatedBy", DB.SafeSQL(obj.CreatedBy)),
                errorCode);
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
           
            return result;
        }

        public static AccountInfoDTO GetAccountInfo(LoginModel obj)
        {
            AccountInfoDTO accInfo = new AccountInfoDTO();
            var dbContext = new ApplicationContext();

            var sqlSting = "EXEC [dbo].[sp_GetAccountInfo] @UserName='" + obj.UserName + "',@Password='" + obj.Password + "',@LoginType='" + obj.LoginType + "'";

            accInfo = dbContext.Database.SqlQuery<AccountInfoDTO>(sqlSting).FirstOrDefault();
            if (accInfo != null)
            {
                accInfo.SessionKey = obj.SessionKey;
            }
            return accInfo;
        }

        public static ResultDTO LogOut(this IEntityBaseRepository<Account> repository, LogoutDTO obj)
        {
            var result = new ResultDTO();

            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_Logout] @UserName,@SessionKey, @errorCode out",
                new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                errorCode);

            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }

        public static ResultDTO ChangePassword(this IEntityBaseRepository<Account> repository, ChangePasswordModel obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_ChangePassword] @AccountName,@OldPassword,@NewPassword, @SessionKey, @errorCode out",
                        new SqlParameter("AccountName", DB.SafeSQL(obj.AccountName)),
                        new SqlParameter("OldPassword", DB.SafeSQL(obj.OldPassword)),
                        new SqlParameter("NewPassword", DB.SafeSQL(obj.NewPassword)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);

            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }

        public static ResultDTO EditAccount(this IEntityBaseRepository<Account> repository, RequestEditAccountDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            
            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_EditAccount] @FullName,@UserName, @SessionKey, @errorCode out",
                    new SqlParameter("FullName", DB.SafeSQL(obj.FullName)),
                    new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();
            
            return result;
        }

        public static ResultDTO DeleteAccount(this IEntityBaseRepository<Account> repository, DeleteAccountDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            if (string.IsNullOrEmpty(obj.UserName) || string.IsNullOrEmpty(obj.SessionKey))
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            }
            else
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_DeleteAccount] @UserName, @SessionKey, @errorCode out",
                       new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                       new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                       errorCode);
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            return result;
        }

       
        //public static ResultDTO LockAccount(this IEntityBaseRepository<Account> repository, LockAccountDTO obj)
        //{
        //    var result = new ResultDTO();
        //    var dbContext = new ApplicationContext();

        //    var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
        //    {
        //        Direction = System.Data.ParameterDirection.Output
        //    };

        //    try
        //    {
        //        result.StatusCode = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_LockAccount] @UserName, @SessionKey,@IsLock, @errorCode out",
        //            new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
        //            new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
        //             new SqlParameter("IsLock", obj.IsLock),
        //            errorCode);
        //        result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
        //        result.SetContentMsg();
        //    }
        //    catch (Exception ex)
        //    {
        //        result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
        //        result.SetContentMsg();
        //    }

        //    return result;
        //}

        //public static ResultDTO LockAffilate(this IEntityBaseRepository<Account> repository, LockAffilateDTO obj)
        //{
        //    var result = new ResultDTO();
        //    var dbContext = new ApplicationContext();

        //    var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
        //    {
        //        Direction = System.Data.ParameterDirection.Output
        //    };

        //    try
        //    {
        //        result.StatusCode = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_LockAffilate] @UserName, @SessionKey,@IsLockAffilate, @errorCode out",
        //             new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
        //            new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
        //             new SqlParameter("IsLockAffilate", obj.IsLockAffilate),
        //            errorCode);
        //        result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
        //        result.SetContentMsg();
        //    }
        //    catch (Exception ex)
        //    {
        //        result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
        //        result.SetContentMsg();
        //    }

        //    return result;
        //}

        public static ResultDTO GetAccountInfo(this IEntityBaseRepository<Account> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.SqlQuery<AccountInfo1DTO>("EXEC [dbo].[sp_GetAccountInfo1] @UserName,@SessionKey,@errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode).FirstOrDefault<AccountInfo1DTO>();
           
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        public static ResultDTO RequestAccountType(this IEntityBaseRepository<Account> repository, RequestAccountTypeDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            if (string.IsNullOrEmpty(obj.UserName) || string.IsNullOrEmpty(obj.SessionKey))
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            }
            else
            {
            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_RequestAccountType] @AccountType,@UserName, @SessionKey, @errorCode out",
                    new SqlParameter("AccountType", obj.AccountType),
                    new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();
            }
            return result;
        }
        public static ResultDTO UpdateAvatar(this IEntityBaseRepository<Account> repository, RequestUpdateAvatarDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var avatarFilePath = new SqlParameter("AvatarFilePath", System.Data.SqlDbType.NVarChar,200)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_UpdateAvatar] @AvatarFileName, @SessionKey,@AvatarFilePath out, @errorCode out",
                         new SqlParameter("AvatarFileName", obj.AvatarFileName),
                         new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                         avatarFilePath,
                         errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();
            result.Details = avatarFilePath.Value.ToString();

            return result;
        }


        #region Leads        
        public static ResultDTO AddLeadsByAccount(this IEntityBaseRepository<Account> repository, RegisterLeadBySoloPageDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_AddLeadsByAccount] @Name,@Email,@Phone,@SoloID,@LeadsType,@Notes,@SessionKey,@errorCode out",
                        new SqlParameter("Name", DB.SafeSQL(obj.Name)),
                        new SqlParameter("Email", DB.SafeSQL(obj.Email)),
                        new SqlParameter("Phone", DB.SafeSQL(obj.Phone)),
                        new SqlParameter("SoloID", DB.SafeSQL(obj.SoloID)),
                        new SqlParameter("LeadsType", obj.LeadsType),
                        new SqlParameter("Notes", DB.SafeSQL(obj.Notes)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);

            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        public static ResultDTO UpdateLeadsByAccount(this IEntityBaseRepository<Account> repository, RegisterLeadBySoloPageDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_UpdateLeadsByAccount] @ID,@Name,@Email,@Phone,@LeadsType,@Notes,@SessionKey,@errorCode out",
                       new SqlParameter("ID", obj.ID),
                       new SqlParameter("Name", DB.SafeSQL(obj.Name)),
                       new SqlParameter("Email", DB.SafeSQL(obj.Email)),
                       new SqlParameter("Phone", DB.SafeSQL(obj.Phone)),
                       new SqlParameter("LeadsType", obj.LeadsType),
                       new SqlParameter("Notes", DB.SafeSQL(obj.Notes)),
                       new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                       errorCode);

            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        public static ResultDTO UpdateLeadsTypeByAccount(this IEntityBaseRepository<Account> repository, RegisterLeadBySoloPageDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_UpdateLeadsTypeByAccount] @ID,@LeadsType,@SessionKey,@errorCode out",
                       new SqlParameter("ID", obj.ID),
                       new SqlParameter("LeadsType", obj.LeadsType),
                       new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                       errorCode);

            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        public static ResultDTO GetLeadsDetailByAccount(this IEntityBaseRepository<Account> repository, RegisterLeadBySoloPageDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            result.Details= dbContext.Database.SqlQuery<LeadsItemDTO>("EXEC [dbo].[sp_GetLeadsDetailByAccount] @ID,@SessionKey,@errorCode out",
                        new SqlParameter("ID", obj.ID),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode).FirstOrDefault<LeadsItemDTO>();

            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        public static ResultDTO SummaryLeadsReportByAccount(this IEntityBaseRepository<Account> repository, SummaryRequestDTO obj)
        {

            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.SqlQuery<LeadsOfMonthDTO>("EXEC [dbo].[sp_SummaryLeadsReportByAccount] @StartList,@EndList, @UserName,@SessionKey,@errorCode out",
                        new SqlParameter("StartList", DB.SafeSQL(obj.StartList)),
                        new SqlParameter("EndList", DB.SafeSQL(obj.EndList)),
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode).ToList<LeadsOfMonthDTO>();
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();
            return result;

        }
        #endregion
        //public static ResultDTO AddTokenPush.



    }
}
