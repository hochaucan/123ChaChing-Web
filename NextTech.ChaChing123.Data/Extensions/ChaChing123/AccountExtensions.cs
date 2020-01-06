using System;
using System.Data.SqlClient;
using NextTech.ChaChing123.Common.Models;
using NextTech.ChaChing123.Core.Models;

namespace NextTech.ChaChing123.Data.Extensions
{
    using NextTech.ChaChing123.Data.Repositories;
    using Entities;
    using System.Linq;
    using Core.Utilities.Security;

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
                try
                {
                    result.StatusCode = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[CheckLogin] @UserName, @SessionKey, @errorCode out",
                        new SqlParameter("FullName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("UserName", DB.SafeSQL(obj.SessionKey)),
                        errorCode);
                }
                catch (Exception ex)
                {
                    result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                    result.StatusMsg = ex.Message;
                }
            }
            return result;
        }

        public static Account Login(this IEntityBaseRepository<Account> repository, LoginModel obj)
        {
            var result = new Account();
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

            //if (int.Parse(errorCode.Value.ToString(), 0) == 0 )
            //{
            //    return GetAccountInfo(obj);
            //}
            //else
            //{
            //    return null;
            //}

            return GetAccountInfo(obj);
        }

        public static ResultDTO Register(this IEntityBaseRepository<Account> repository, RegisterDTO obj)
        {
            var result =new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.StatusCode = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_RegisterAccount] @FullName, @UserName, @Email, @Phone,@Password,@AccountType,@RefCode,@ContractNo,@SubDomain,@CreatedBy, @errorCode out",
                new SqlParameter("FullName", DB.SafeSQL(obj.FullName)),
                new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                new SqlParameter("Email", DB.SafeSQL(obj.Email)),
                new SqlParameter("Phone", DB.SafeSQL(obj.Phone)),
                new SqlParameter("Password", DB.SafeSQL(obj.Password)),
                new SqlParameter("AccountType", obj.AccountType),
                new SqlParameter("RefCode", DB.SafeSQL(obj.RefCode)),
                new SqlParameter("ContractNo", DB.SafeSQL(obj.ContractNo)),
                new SqlParameter("SubDomain", DB.SafeSQL(obj.CreatedBy)),
                new SqlParameter("CreatedBy", DB.SafeSQL(obj.CreatedBy)),
                errorCode);

            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            //if (int.Parse(errorCode.Value.ToString(), 0) == 16 || int.Parse(errorCode.Value.ToString(), 0) == 17)
            //{
            //    //return FO_Account_GetAccountInfo(obj);
            //}

            return result;
        }

        public static Account GetAccountInfo(LoginModel obj)
        {
            var dbContext = new ApplicationContext();

            var sqlSting = "EXEC [dbo].[sp_GetAccountInfo] @UserName='" + obj.UserName + "',@Password='" + obj.Password + "',@LoginType='" + obj.LoginType + "'";

            var item = dbContext.Database.SqlQuery<Account>(sqlSting).FirstOrDefault();
            if (item != null)
            {
                item.Password = string.Empty;
                item.UpdatedBy = obj.SessionKey;
            }
            return item;
        }

        public static int LogOut(this IEntityBaseRepository<Account> repository, LogoutDTO obj)
        {
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[Logout] @UserName,@SessionKey, @errorCode out",
                new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                errorCode);

            return int.Parse(errorCode.Value.ToString(), 0);
        }


        public static ResultDTO ActiveAccount(this IEntityBaseRepository<Account> repository, ActiveAccountDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            //if (string.IsNullOrEmpty(obj.UserName) || string.IsNullOrEmpty(obj.SessionKey))
            //{
            //    result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            //}
            //else
            {
                try
                {
                     dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_ActiveAccount] @UserName, @SessionKey,@Status, @errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                         new SqlParameter("Status", obj.Status),
                        errorCode);
                    result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                }
                catch (Exception ex)
                {
                    result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                    result.StatusMsg = ex.Message;
                }
            }
            
            return result;
        }


        public static ResultDTO EditAccount(this IEntityBaseRepository<Account> repository, EditAccountDTO obj)
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
                try
                {
                    result.StatusCode = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_EditAccount] @FullName,@UserName, @Email,@Phone, @SessionKey, @errorCode out",
                        new SqlParameter("FullName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("Email", DB.SafeSQL(obj.Email)),
                        new SqlParameter("Phone", DB.SafeSQL(obj.Phone)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);
                }
                catch (Exception ex)
                {
                    result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                    result.StatusMsg = ex.Message;
                }
            }



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
                try
                {
                    //result.StatusCode = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_DeleteAccount] @UserName, @SessionKey, @errorCode out",
                    //    new SqlParameter("FullName", DB.SafeSQL(obj.UserName)),
                    //    new SqlParameter("UserName", DB.SafeSQL(obj.SessionKey)),
                    //    errorCode);
                }
                catch (Exception ex)
                {
                    result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                    result.StatusMsg = ex.Message;
                }
            }



            return result;
        }

        public static ResultDTO ChangeAccountType(this IEntityBaseRepository<Account> repository, ChangeAccountTypeDTO obj)
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
                try
                {
                    dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_ChangeAccountType] @UserName, @SessionKey,@AccountType, @errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                         new SqlParameter("AccountType", obj.AccountType),
                        errorCode);
                    result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                }
                catch (Exception ex)
                {
                    result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                    result.StatusMsg = ex.Message;
                }
            }



            return result;
        }

        public static ResultDTO LockAccount(this IEntityBaseRepository<Account> repository, LockAccountDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            //if (string.IsNullOrEmpty(obj.UserName) || string.IsNullOrEmpty(obj.SessionKey))
            //{
            //    result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            //}
            //else
            {
                try
                {
                    result.StatusCode = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_LockAccount] @UserName, @SessionKey,@IsLock, @errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                         new SqlParameter("IsLock", obj.IsLock),
                        errorCode);
                    result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                }
                catch (Exception ex)
                {
                    result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                    result.StatusMsg = ex.Message;
                }
            }



            return result;
        }

        public static ResultDTO LockAffilate(this IEntityBaseRepository<Account> repository, LockAffilateDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            //if (string.IsNullOrEmpty(obj.UserName) || string.IsNullOrEmpty(obj.SessionKey))
            //{
            //    result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            //}
            //else
            {
                try
                {
                    result.StatusCode = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_LockAffilate] @UserName, @SessionKey,@IsLockAffilate, @errorCode out",
                         new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                         new SqlParameter("IsLockAffilate", obj.IsLockAffilate),
                        errorCode);
                    result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                }
                catch (Exception ex)
                {
                    result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                    result.StatusMsg = ex.Message;
                }
            }



            return result;
        }

        public static ResultDTO GetAccountInfo(this IEntityBaseRepository<Account> repository, int id)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var accountInfo = new Account();
            accountInfo.Password = string.Empty;
            result.Details = accountInfo;
            return result;
        }

        public static Account GetSingleByUsername(this IEntityBaseRepository<Account> userRepository, string username)
        {
            return userRepository.GetAll().FirstOrDefault(x => x.UserName == username);
        }
    }
}
