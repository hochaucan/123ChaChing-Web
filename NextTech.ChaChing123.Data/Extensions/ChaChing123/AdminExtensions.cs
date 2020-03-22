

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
    /// Class AdminExtensions.
    /// </summary>
    public static class AdminExtensions
    {
        #region Account & Affialate        
        // No.1
        public static ResultDTO GetAccountList(this IEntityBaseRepository<Admin> repository, RequestOrderListDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var count = new SqlParameter("Count", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            BODataListDTO Items = new BODataListDTO();
            Items.Items = dbContext.Database.SqlQuery<BOAccountItemDTO>("EXEC [dbo].[sp_BO_GetAccountList] @SessionKey, @Count out,@errorCode out",
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        count,
                        errorCode).Skip((obj.PageIndex - 1) * obj.PageCount).Take(obj.PageCount).ToList<BOAccountItemDTO>();

            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();
            if (result.StatusCode == 0)
            {
                Items.Total = int.Parse(count.Value.ToString(), 0);
                result.Details = Items;
            }
            return result;
        }
        // No.2
        public static ResultDTO GetOrderList(this IEntityBaseRepository<Admin> repository, RequestOrderListDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var count = new SqlParameter("Count", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                BODataListDTO Items = new BODataListDTO();
                Items.Items = dbContext.Database.SqlQuery<BOOrderItemDto>("EXEC [dbo].[sp_BO_GetOrderList] @UserName,@SessionKey, @Count out, @errorCode out",
                    new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    count,
                    errorCode).Skip((obj.PageIndex - 1) * obj.PageCount).Take(obj.PageCount).ToList<BOOrderItemDto>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                if (result.StatusCode == 0)
                {
                    Items.Total = int.Parse(count.Value.ToString(), 0);
                    result.Details = Items;
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }
        // No.3
        public static ResultDTO GetAffialateList(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.SqlQuery<BOAccountItem1DTO>("EXEC [dbo].[sp_BO_AffialateList] @SessionKey,@errorCode out",
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode).ToList<BOAccountItem1DTO>();

            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();
            return result;
        }
        // No.4
        public static ResultDTO UpdatePaymentState(this IEntityBaseRepository<Admin> repository, PaymentContractDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_UpdatePaymentState] @UserName,@ContractNo, @SessionKey,@PaymentState, @errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("ContractNo", DB.SafeSQL(obj.ContractNo)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                         new SqlParameter("PaymentState", obj.PaymentState),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        // No.5
        public static ResultDTO UpdatePaymentAffiliateState(this IEntityBaseRepository<Admin> repository, PaymentAffiliateDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_UpdatePaymentAffiliateState] @UserName,@ContractNo, @SessionKey,@AffiliateState, @errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("ContractNo", DB.SafeSQL(obj.ContractNo)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                         new SqlParameter("AffiliateState", obj.AffiliateState),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        // No.6
        public static ResultDTO GetAccountInfo(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.SqlQuery<BOAccountInfoDTO>("EXEC [dbo].[sp_BO_GetAccountInfo]  @AccountName,@SessionKey,@errorCode out",
                        new SqlParameter("AccountName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode).FirstOrDefault<BOAccountInfoDTO>();
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();
            return result;
        }
        // No7=>TODO
        public static ResultDTO SetDefautAccount(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            LoginModel objLogin = new LoginModel();
            AccountInfoDTO accObj = dbContext.Database.SqlQuery<AccountInfoDTO>("EXEC [dbo].[sp_BO_SetDefautAccount]  @AccountName,@AccSessionKey,@SessionKey,@errorCode out",
                        new SqlParameter("AccountName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("AccSessionKey", DB.SafeSQL(objLogin.SessionKey)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode).FirstOrDefault<AccountInfoDTO>();
            if (accObj != null)
            {
                accObj.SessionKey = objLogin.SessionKey;
                result.Details = accObj;
            }
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        // No8=>TODO
        public static ResultDTO SetPasswodForAccount(this IEntityBaseRepository<Admin> repository, ChangePasswordModel obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_SetPasswodForAccount] @AccountName,@NewPassword, @SessionKey, @errorCode out",
                        new SqlParameter("AccountName", DB.SafeSQL(obj.AccountName)),
                        new SqlParameter("NewPassword", DB.SafeSQL(obj.NewPassword)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);

            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();
            return result;
        }
        // No9=>TODO       
        public static ResultDTO ChangeAccountType(this IEntityBaseRepository<Admin> repository, ChangeAccountTypeDTO obj)
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
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_ChangeAccountType] @UserName, @SessionKey,@AccountType, @errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                         new SqlParameter("AccountType", obj.AccountType),
                        errorCode);
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            return result;
        }

        // No.10=>TODO
        public static ResultDTO LockAccount(this IEntityBaseRepository<Admin> repository, LockAccountDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                result.StatusCode = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_LockAccount] @UserName, @SessionKey,@IsLock, @errorCode out",
                    new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                     new SqlParameter("IsLock", obj.IsLock),
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
        // No.11=>TODO
        public static ResultDTO LockAffialate(this IEntityBaseRepository<Admin> repository, LockAffilateDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                result.StatusCode = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_LockAffialate] @UserName, @SessionKey,@IsLockAffilate, @errorCode out",
                     new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                     new SqlParameter("IsLockAffilate", obj.IsLockAffilate),
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
        // No.12=>TODO
        public static ResultDTO GetAffiliateList(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            var count = new SqlParameter("Count", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                BODataListDTO Items = new BODataListDTO();
                Items.Items = dbContext.Database.SqlQuery<BOAccountInfo2DTO>("EXEC [dbo].[sp_BO_GetAffiliateListByAccount]  @AccountName,@SessionKey,@Count out,@errorCode out",
                        new SqlParameter("AccountName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    count,
                    errorCode).Skip((obj.PageIndex - 1) * obj.PageCount).Take(obj.PageCount).ToList<BOAccountInfo2DTO>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                if (result.StatusCode == 0)
                {
                    Items.Total = int.Parse(count.Value.ToString(), 0);
                    result.Details = Items;
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }
            return result;
        }
        // No.13
        public static ResultDTO UpdateAccountInfo(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            //var dbContext = new ApplicationContext();

            //var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            //{
            //    Direction = System.Data.ParameterDirection.Output
            //};

            //result.Details = dbContext.Database.SqlQuery<BOAccountInfoDTO>("EXEC [dbo].[sp_BO_GetAccountInfo]  @AccountName,@SessionKey,@errorCode out",
            //            new SqlParameter("AccountName", DB.SafeSQL(obj.UserName)),
            //            new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
            //            errorCode).FirstOrDefault<BOAccountInfoDTO>();
            //result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            //result.SetContentMsg();
            return result;
        }

        // No.14
        public static ResultDTO GetWithDrawallInfoByAccount(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            var count = new SqlParameter("Count", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                BODataListDTO Items = new BODataListDTO();
                Items.Items = dbContext.Database.SqlQuery<BOWithDrawallInfoDTO>("EXEC [dbo].[sp_BO_GetWithDrawalInfoByAccount]  @AccountName,@SessionKey,@Count out,@errorCode out",
                        new SqlParameter("AccountName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        count,
                    errorCode).Skip((obj.PageIndex - 1) * obj.PageCount).Take(obj.PageCount).ToList<BOWithDrawallInfoDTO>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                if (result.StatusCode == 0)
                {
                    Items.Total = int.Parse(count.Value.ToString(), 0);
                    result.Details = Items;
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }
        // No.15
        public static ResultDTO SummaryRevenueReport(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var count = new SqlParameter("Count", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                //sp_BO_GetOrderList
                BODataListDTO Items = new BODataListDTO();
                Items.Items = dbContext.Database.SqlQuery<BOOrderItemDto>("EXEC [dbo].[sp_BO_SummaryRevenueReport] @UserName,@SessionKey, @Count out, @errorCode out",
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    count,
                    errorCode).Skip((obj.PageIndex - 1) * obj.PageCount).Take(obj.PageCount).ToList<BOOrderItemDto>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                if (result.StatusCode == 0)
                {
                    Items.Total = int.Parse(count.Value.ToString(), 0);
                    result.Details = Items;
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }

        // No.16
        public static ResultDTO SummaryCommissionReport(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_SummaryCommissionReport] @UserName,@SessionKey,@errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        // No.17
        public static ResultDTO GetAllWithDrawallInfo(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_GetAllWithDrawallInfo] @UserName,@SessionKey,@errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        // No.18
        public static ResultDTO SumaryReportChart(this IEntityBaseRepository<Admin> repository, SummaryRequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.SqlQuery<AffiliateOfMonthDTO>("EXEC [dbo].[sp_BO_SumaryReportChart] @StartList,@EndList, @SessionKey,@errorCode out",
                        new SqlParameter("StartList", DB.SafeSQL(obj.StartList)),
                        new SqlParameter("EndList", DB.SafeSQL(obj.EndList)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode).ToList<AffiliateOfMonthDTO>();
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();
            return result;

        }
        // No.19
        public static ResultDTO GetAllLead(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_GetAllLead] @UserName,@SessionKey,@errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        // No.20
        public static ResultDTO ActiveAccount(this IEntityBaseRepository<Admin> repository, ActiveAccountDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_ActiveAccount] @UserName, @SessionKey,@Status, @errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                         new SqlParameter("Status", obj.Status),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        // No.21
        public static ResultDTO Login(this IEntityBaseRepository<Admin> repository, LoginModel obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_UserLogin] @UserName, @Password, @SessionKey, @LoginType, @UserAdmin, @errorCode out",
                new SqlParameter("UserName", obj.UserName),
                new SqlParameter("Password", obj.Password),
                new SqlParameter("SessionKey", obj.SessionKey),
                new SqlParameter("LoginType", obj.LoginType),
                new SqlParameter("UserAdmin", obj.UserAdmin),
                errorCode);

            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            if (int.Parse(errorCode.Value.ToString(), 0) == 0)
            {
                result.Details = obj.SessionKey;
            }

            return result;
        }
        public static AccountInfoDTO GetUserInfo(LoginModel obj)
        {
            AccountInfoDTO accInfo = new AccountInfoDTO();
            var dbContext = new ApplicationContext();

            var sqlSting = "EXEC [dbo].[sp_GetUserInfo] @UserName='" + obj.UserName + "',@Password='" + obj.Password + "',@LoginType='" + obj.LoginType + "'";

            var item = dbContext.Database.SqlQuery<Admin>(sqlSting).FirstOrDefault();
            if (accInfo != null)
            {
                //accInfo.FullName = item.FullName;
                //accInfo.Email = item.Email;
                //accInfo.UserName = item.UserName;
                //accInfo.Phone = item.Phone;
                //accInfo.UserType = item.UserType;
                //accInfo.Status = item.Status;
                //accInfo.IsLock = item.IsLock;
                //accInfo.IsLock = item.IsLock;
                //accInfo.IsLockAffilate = item.IsLockAffilate;
                //accInfo.RegisterDate= item.CreatedDate.ToString("dd/MM/yyyy");
                //accInfo.AvartaPath = item.AvartaPath;
                //accInfo.SessionKey = obj.SessionKey;
            }

            return accInfo;
        }
        // No.22
        public static ResultDTO LogOut(this IEntityBaseRepository<Admin> repository, LogoutDTO obj)
        {
            var result = new ResultDTO();

            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Logout] @UserName,@SessionKey, @errorCode out",
                new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                errorCode);

            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        // No.23
        public static ResultDTO ChangePassword(this IEntityBaseRepository<Admin> repository, ChangePasswordModel obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_ChangePassword] @UserName,@OldPassword,@NewPassword, @SessionKey, @errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.AccountName)),
                        new SqlParameter("OldPassword", DB.SafeSQL(obj.OldPassword)),
                        new SqlParameter("NewPassword", DB.SafeSQL(obj.NewPassword)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);

            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        // No.24
        public static ResultDTO ApprovetWithDrawallInfoByAccount(this IEntityBaseRepository<Admin> repository, WithdrawaltDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_ApprovetWithDrawalInfoByAccount] @UserName,@SessionKey,@errorCode out",
                        new SqlParameter("ContractNo", DB.SafeSQL(obj.ContractNo)),
                        new SqlParameter("AccountName", DB.SafeSQL(obj.AccountName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        new SqlParameter("Status", obj.Status),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }

        #endregion

        #region [TitleTemplate]
        public static ResultDTO AddTitleTemplate(this IEntityBaseRepository<Admin> repository, BOTitleTemplateDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_AddTitleTemplate] @Title,@Order,@Active,@SessionKey, @errorCode out",
               new SqlParameter("Title", DB.SafeSQL(obj.Title)),
               new SqlParameter("Order", obj.Order),
               new SqlParameter("Active", obj.Active),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        public static ResultDTO EditTitleTemplate(this IEntityBaseRepository<Admin> repository, BOTitleTemplateDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_EditTitleTemplate] @ID,@Title,@Order,@Active,@SessionKey, @errorCode out",
               new SqlParameter("ID", obj.ID),
               new SqlParameter("Title", DB.SafeSQL(obj.Title)),
               new SqlParameter("Order", obj.Order),
               new SqlParameter("Active", obj.Active),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        public static ResultDTO DeleteTitleTemplate(this IEntityBaseRepository<Admin> repository, BOTitleTemplateDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_DeleteTitleTemplate] @ID,@SessionKey, @errorCode out",
               new SqlParameter("ID", obj.ID),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        public static ResultDTO GetAllTitleTemplate(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                result.Details = dbContext.Database.SqlQuery<TitleTemplateDTO>("EXEC [dbo].[sp_BO_GetAllTitleTemplate] @SessionKey, @errorCode out",
                           new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                           errorCode).ToList<TitleTemplateDTO>();

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        
        #endregion

        #region [SubTitleTemplate]
        public static ResultDTO AddSubTitleTemplate(this IEntityBaseRepository<Admin> repository, BOTitleTemplateDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_AddSubTitleTemplate] @Title,@Order,@Active,@SessionKey, @errorCode out",
               new SqlParameter("Title", DB.SafeSQL(obj.Title)),
               new SqlParameter("Order", obj.Order),
               new SqlParameter("Active", obj.Active),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        public static ResultDTO EditSubTitleTemplate(this IEntityBaseRepository<Admin> repository, BOTitleTemplateDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_EditSubTitleTemplate] @ID,@Title,@Order,@Active,@SessionKey, @errorCode out",
               new SqlParameter("ID", obj.ID),
               new SqlParameter("Title", DB.SafeSQL(obj.Title)),
               new SqlParameter("Order", obj.Order),
               new SqlParameter("Active", obj.Active),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        public static ResultDTO DeleteSubTitleTemplate(this IEntityBaseRepository<Admin> repository, BOTitleTemplateDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_DeleteSubTitleTemplate] @ID,@SessionKey, @errorCode out",
               new SqlParameter("ID", obj.ID),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        public static ResultDTO GetAllSubTitleTemplate(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                result.Details = dbContext.Database.SqlQuery<TitleTemplateDTO>("EXEC [dbo].[sp_BO_GetAllSubTitleTemplate] @SessionKey, @errorCode out",
                           new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                           errorCode).ToList<TitleTemplateDTO>();

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }

        #endregion



        #region Leads
        public static ResultDTO GetAllLeads(this IEntityBaseRepository<Admin> repository, LeadsDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var count = new SqlParameter("Count", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {

                BODataListDTO Items = new BODataListDTO();
                Items.Items = dbContext.Database.SqlQuery<LeadsItemDTO>("EXEC [dbo].[sp_BO_GetAllLeads] @UserName, @SessionKey,@LeadType, @Count out, @errorCode out",
                               new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                                new SqlParameter("LeadType", DB.SafeSQL(obj.LeadType)),
                                count,
                                errorCode).Skip((obj.PageIndex - 1) * obj.PageCount).Take(obj.PageCount).ToList<LeadsItemDTO>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                if (result.StatusCode == 0)
                {
                    Items.Total = int.Parse(count.Value.ToString(), 0);
                    result.Details = Items;
                }

            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        #endregion
        //ONStep 4:

        #region [Quick Replies]
        // Get All
        public static ResultDTO GetAllQuickReplies(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var count = new SqlParameter("Count", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                BODataListDTO Items = new BODataListDTO();
                Items.Items = dbContext.Database.SqlQuery<BOResponseDto>("EXEC [dbo].[sp_BO_QuickReplies_GetAll] @SessionKey, @Count out, @errorCode out",
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    count,
                    errorCode).Skip((obj.PageIndex - 1) * obj.PageCount).Take(obj.PageCount).ToList<BOResponseDto>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                if (result.StatusCode == 0)
                {
                    Items.Total = int.Parse(count.Value.ToString(), 0);
                    result.Details = Items;
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }
        // Add Item
        public static ResultDTO AddQuickReplies(this IEntityBaseRepository<Admin> repository, BOQuickRepliesItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_QuickReplies_Add] @Title,@Content,@Order,@Active,@SessionKey, @errorCode out",
               new SqlParameter("Title", DB.SafeSQL(obj.Title)),
               new SqlParameter("Content", DB.SafeSQL(obj.Content)),
               new SqlParameter("Order", obj.Order),
               new SqlParameter("Active", obj.Active),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Edit Item
        public static ResultDTO UpdateQuickRepliesByID(this IEntityBaseRepository<Admin> repository, BOQuickRepliesItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_QuickReplies_Update] @ID,@Title,@Content,@Order,@Active,@SessionKey, @errorCode out",
                 new SqlParameter("ID", obj.ID),
                 new SqlParameter("Title", DB.SafeSQL(obj.Title)),
                 new SqlParameter("Content", DB.SafeSQL(obj.Content)),
                 new SqlParameter("Order", obj.Order),
                 new SqlParameter("Active", obj.Active),
                 new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                 errorCode);


                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Delete Item
        public static ResultDTO DeleteQuickRepliesByID(this IEntityBaseRepository<Admin> repository, RequestViewDetaiDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_QuickReplies_Delete] @ID,@SessionKey, @errorCode out",
               new SqlParameter("ID", obj.ID),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }

        public static ResultDTO GetQuickRepliesInfoByID(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                result.Details = dbContext.Database.SqlQuery<BODocumentItem1DTO>("EXEC [dbo].[sp_BO_QuickReplies_GetInfoByID] @ID,@SessionKey, @errorCode out",
                    new SqlParameter("ID", obj.ID),
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    errorCode).FirstOrDefault<BODocumentItem1DTO>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();

            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }
        #endregion

        #region [Script]
        // Get All
        public static ResultDTO GetAllScript(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var count = new SqlParameter("Count", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                BODataListDTO Items = new BODataListDTO();
                Items.Items = dbContext.Database.SqlQuery<BOResponseDto>("EXEC [dbo].[sp_BO_Script_GetAll] @SessionKey, @Count out, @errorCode out",
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    count,
                    errorCode).Skip((obj.PageIndex - 1) * obj.PageCount).Take(obj.PageCount).ToList<BOResponseDto>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                if (result.StatusCode == 0)
                {
                    Items.Total = int.Parse(count.Value.ToString(), 0);
                    result.Details = Items;
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }
        // Add Item
        public static ResultDTO AddScript(this IEntityBaseRepository<Admin> repository, BOScriptItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {

                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Script_Add] @Title,@Content,@Order,@Active,@SessionKey, @errorCode out",
              new SqlParameter("Title", DB.SafeSQL(obj.Title)),
              new SqlParameter("Content", DB.SafeSQL(obj.Content)),
              new SqlParameter("Order", obj.Order),
              new SqlParameter("Active", obj.Active),
              new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
              errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Edit Item
        public static ResultDTO UpdateScriptByID(this IEntityBaseRepository<Admin> repository, BOScriptItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Script_Update] @ID,@Title,@Content,@Order,@Active,@SessionKey, @errorCode out",
                 new SqlParameter("ID", obj.ID),
                 new SqlParameter("Title", DB.SafeSQL(obj.Title)),
                 new SqlParameter("Content", DB.SafeSQL(obj.Content)),
                 new SqlParameter("Order", obj.Order),
                 new SqlParameter("Active", obj.Active),
                 new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                 errorCode);


                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Delete Item
        public static ResultDTO DeleteScriptByID(this IEntityBaseRepository<Admin> repository, RequestViewDetaiDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Script_Delete] @ID,@SessionKey, @errorCode out",
               new SqlParameter("ID", obj.ID),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        public static ResultDTO GetScriptInfoByID(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                result.Details = dbContext.Database.SqlQuery<BODocumentItem1DTO>("EXEC [dbo].[sp_BO_Script_GetInfoByID] @ID,@SessionKey, @errorCode out",
                    new SqlParameter("ID", obj.ID),
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    errorCode).FirstOrDefault<BODocumentItem1DTO>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();

            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }
        #endregion

        #region [Rebuttals]
        // Get All
        public static ResultDTO GetAllRebuttals(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var count = new SqlParameter("Count", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                BODataListDTO Items = new BODataListDTO();
                Items.Items = dbContext.Database.SqlQuery<BOResponseDto>("EXEC [dbo].[sp_BO_Rebuttals_GetAll] @SessionKey, @Count out, @errorCode out",
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    count,
                    errorCode).Skip((obj.PageIndex - 1) * obj.PageCount).Take(obj.PageCount).ToList<BOResponseDto>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                if (result.StatusCode == 0)
                {
                    Items.Total = int.Parse(count.Value.ToString(), 0);
                    result.Details = Items;
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }
        // Add Item
        public static ResultDTO AddRebuttals(this IEntityBaseRepository<Admin> repository, BORebuttalsItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Rebuttals_Add] @Title,@Content,@Order,@Active,@SessionKey, @errorCode out",
                new SqlParameter("Title", DB.SafeSQL(obj.Title)),
                new SqlParameter("Content", DB.SafeSQL(obj.Content)),
                new SqlParameter("Order", obj.Order),
                new SqlParameter("Active", obj.Active),
                new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                errorCode);
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Edit Item
        public static ResultDTO UpdateRebuttalsByID(this IEntityBaseRepository<Admin> repository, BORebuttalsItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Rebuttals_Update] @ID,@Title,@Content,@Order,@Active,@SessionKey, @errorCode out",
                 new SqlParameter("ID", obj.ID),
                 new SqlParameter("Title", DB.SafeSQL(obj.Title)),
                 new SqlParameter("Content", DB.SafeSQL(obj.Content)),
                 new SqlParameter("Order", obj.Order),
                 new SqlParameter("Active", obj.Active),
                 new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                 errorCode);
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Delete Item
        public static ResultDTO DeleteRebuttalsByID(this IEntityBaseRepository<Admin> repository, RequestViewDetaiDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Rebuttals_Delete] @ID,@SessionKey, @errorCode out",
               new SqlParameter("ID", obj.ID),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }

        public static ResultDTO GetRebuttalsInfoByID(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                result.Details = dbContext.Database.SqlQuery<BODocumentItem1DTO>("EXEC [dbo].[sp_BO_Rebuttals_GetInfoByID] @ID,@SessionKey, @errorCode out",
                    new SqlParameter("ID", obj.ID),
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    errorCode).FirstOrDefault<BODocumentItem1DTO>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();

            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }
        #endregion

        #region [Documents]
        // Get All
        public static ResultDTO GetAllDocuments(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var count = new SqlParameter("Count", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                BODataListDTO Items = new BODataListDTO();
                Items.Items = dbContext.Database.SqlQuery<BODocumentsItem1DTO>("EXEC [dbo].[sp_BO_Documents_GetAll] @SessionKey, @Count out, @errorCode out",
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    count,
                    errorCode).Skip((obj.PageIndex - 1) * obj.PageCount).Take(obj.PageCount).ToList<BODocumentsItem1DTO>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                if (result.StatusCode == 0)
                {
                    Items.Total = int.Parse(count.Value.ToString(), 0);
                    result.Details = Items;
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }
        // Get All by account
        public static ResultDTO GetAllDocumentsByAccount(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var count = new SqlParameter("Count", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                BODataListDTO Items = new BODataListDTO();
                Items.Items = dbContext.Database.SqlQuery<BODocumentsItem1DTO>("EXEC [dbo].[sp_FO_Documents_GetAll] @SessionKey, @Count out, @errorCode out",
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    count,
                    errorCode).Skip((obj.PageIndex - 1) * obj.PageCount).Take(obj.PageCount).ToList<BODocumentsItem1DTO>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                if (result.StatusCode == 0)
                {
                    Items.Total = int.Parse(count.Value.ToString(), 0);
                    result.Details = Items;
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }
        // Add Item
        public static ResultDTO AddDocuments(this IEntityBaseRepository<Admin> repository, BODocumentsItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Documents_Add] @Title,@Description,@Order,@Type,@Active,@IsAdvanced,@SessionKey, @errorCode out",
              new SqlParameter("Title", DB.SafeSQL(obj.Title)),
              new SqlParameter("Description", DB.SafeSQL(obj.Description)),
              new SqlParameter("Order", obj.Order),
              new SqlParameter("Type", obj.Type),
              new SqlParameter("Active", obj.Active),
              new SqlParameter("IsAdvanced", obj.IsAdvanced),
              new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
              errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Edit Item
        public static ResultDTO UpdateDocumentsByID(this IEntityBaseRepository<Admin> repository, BODocumentsItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Documents_Update] @ID,@Title,@Description,@Order,@Type,@Active,@IsAdvanced,@SessionKey, @errorCode out",
              new SqlParameter("ID", obj.ID),
              new SqlParameter("Title", DB.SafeSQL(obj.Title)),
              new SqlParameter("Description", DB.SafeSQL(obj.Description)),
              new SqlParameter("Order", obj.Order),
              new SqlParameter("Type", obj.Type),
              new SqlParameter("Active", obj.Active),
              new SqlParameter("IsAdvanced", obj.IsAdvanced),
              new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
              errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Delete Item
        public static ResultDTO DeleteDocumentsByID(this IEntityBaseRepository<Admin> repository, RequestViewDetaiDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Documents_Delete] @ID,@SessionKey, @errorCode out",
               new SqlParameter("ID", obj.ID),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
       
        #endregion

        #region [Document]
        // Get All
        public static ResultDTO GetAllDocument(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var count = new SqlParameter("Count", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                BODataListDTO Items = new BODataListDTO();
                Items.Items = dbContext.Database.SqlQuery<BODocumentItem1DTO>("EXEC [dbo].[sp_BO_Document_GetAll] @SessionKey, @Count out, @errorCode out",
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    count,
                    errorCode).Skip((obj.PageIndex - 1) * obj.PageCount).Take(obj.PageCount).ToList<BODocumentItem1DTO>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                if (result.StatusCode == 0)
                {
                    Items.Total = int.Parse(count.Value.ToString(), 0);
                    result.Details = Items;
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }
        public static ResultDTO GetAllDocumentByCatID(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var count = new SqlParameter("Count", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                BODataListDTO Items = new BODataListDTO();
                Items.Items = dbContext.Database.SqlQuery<BODocumentItem1DTO>("EXEC [dbo].[sp_BO_Document_GetAllByCatID] @DocsID,@SessionKey, @Count out, @errorCode out",
                    new SqlParameter("DocsID", obj.ID),
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    count,
                    errorCode).Skip((obj.PageIndex - 1) * obj.PageCount).Take(obj.PageCount).ToList<BODocumentItem1DTO>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                if (result.StatusCode == 0)
                {
                    Items.Total = int.Parse(count.Value.ToString(), 0);
                    result.Details = Items;
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }
        public static ResultDTO GetDocumentInfoByID(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                result.Details = dbContext.Database.SqlQuery<BODocumentItem1DTO>("EXEC [dbo].[sp_BO_Document_GetInfoByID] @ID,@SessionKey, @errorCode out",
                    new SqlParameter("ID", obj.ID),
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    errorCode).FirstOrDefault<BODocumentItem1DTO>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
               
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }

        // Add Item
        public static ResultDTO AddDocument(this IEntityBaseRepository<Admin> repository, BODocumentItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Document_Add] @Title,@Content,@ImagePath,@Link,@ResourcePath,@Style,@DocumentsID,@Order,@Active,@SessionKey, @errorCode out",
             new SqlParameter("Title", DB.SafeSQL(obj.Title)),
             new SqlParameter("Content", DB.SafeSQL(obj.Content)),
             new SqlParameter("ImagePath", DB.SafeSQL(obj.ImagePath)),
             new SqlParameter("Link", DB.SafeSQL(obj.Link)),
             new SqlParameter("ResourcePath", DB.SafeSQL(obj.ResourcePath)),
             new SqlParameter("Style", obj.Style),
             new SqlParameter("DocumentsID", obj.DocumentsID),
             new SqlParameter("Order", obj.Order),
             new SqlParameter("Active", obj.Active),
             new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
             errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Edit Item
        public static ResultDTO UpdateDocumentByID(this IEntityBaseRepository<Admin> repository, BODocumentItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Document_Update] @ID,@Title,@Content,@ImagePath,@Link,@ResourcePath,@Style,@DocumentsID,@Order,@Active,@SessionKey, @errorCode out",
           new SqlParameter("ID", obj.ID),
           new SqlParameter("Title", DB.SafeSQL(obj.Title)),
           new SqlParameter("Content", DB.SafeSQL(obj.Content)),
           new SqlParameter("ImagePath", DB.SafeSQL(obj.ImagePath)),
           new SqlParameter("Link", DB.SafeSQL(obj.Link)),
           new SqlParameter("ResourcePath", DB.SafeSQL(obj.ResourcePath)),
           new SqlParameter("Style", obj.Style),
           new SqlParameter("DocumentsID", obj.DocumentsID),
           new SqlParameter("Order", obj.Order),
           new SqlParameter("Active", obj.Active),
           new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
           errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Delete Item
        public static ResultDTO DeleteDocumentByID(this IEntityBaseRepository<Admin> repository, RequestViewDetaiDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Document_Delete] @ID,@SessionKey, @errorCode out",
               new SqlParameter("ID", obj.ID),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        #endregion

        #region [BlockTabMarketing]
        // Get All
        public static ResultDTO GetAllBlockTabMarketing(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var count = new SqlParameter("Count", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                BODataListDTO Items = new BODataListDTO();
                Items.Items = dbContext.Database.SqlQuery<BOResponseDto>("EXEC [dbo].[sp_BO_BlockTabMarketing_GetAll] @SessionKey, @Count out, @errorCode out",
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    count,
                    errorCode).Skip((obj.PageIndex - 1) * obj.PageCount).Take(obj.PageCount).ToList<BOResponseDto>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                if (result.StatusCode == 0)
                {
                    Items.Total = int.Parse(count.Value.ToString(), 0);
                    result.Details = Items;
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }
        // Add Item
        public static ResultDTO AddBlockTabMarketing(this IEntityBaseRepository<Admin> repository, BOBlockTabMarketingItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_BlockTabMarketing_Add] @Title,@Content,@ImagePath,@Link,@ResourcePath,@Style,@DocumentsID,@Order,@Active,@SessionKey, @errorCode out",
            new SqlParameter("Title", DB.SafeSQL(obj.Title)),
            new SqlParameter("Content", DB.SafeSQL(obj.Content)),
            new SqlParameter("ImagePath", DB.SafeSQL(obj.ImagePath)),
            new SqlParameter("Link", DB.SafeSQL(obj.Link)),
            new SqlParameter("ResourcePath", DB.SafeSQL(obj.ResourcePath)),
            new SqlParameter("Style", obj.Style),
            new SqlParameter("Order", obj.Order),
            new SqlParameter("Active", obj.Active),
            new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
            errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Edit Item
        public static ResultDTO UpdateBlockTabMarketingByID(this IEntityBaseRepository<Admin> repository, BOBlockTabMarketingItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_BlockTabMarketing_Update] @Title,@Content,@ImagePath,@Link,@ResourcePath,@Style,@DocumentsID,@Order,@Active,@SessionKey, @errorCode out",
            new SqlParameter("ID", obj.ID),
            new SqlParameter("Title", DB.SafeSQL(obj.Title)),
            new SqlParameter("Content", DB.SafeSQL(obj.Content)),
            new SqlParameter("ImagePath", DB.SafeSQL(obj.ImagePath)),
            new SqlParameter("Link", DB.SafeSQL(obj.Link)),
            new SqlParameter("ResourcePath", DB.SafeSQL(obj.ResourcePath)),
            new SqlParameter("Style", obj.Style),
            new SqlParameter("Order", obj.Order),
            new SqlParameter("Active", obj.Active),
            new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
            errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Delete Item
        public static ResultDTO DeleteBlockTabMarketingByID(this IEntityBaseRepository<Admin> repository, RequestViewDetaiDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_BlockTabMarketing_Delete] @ID,@SessionKey, @errorCode out",
               new SqlParameter("ID", obj.ID),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        #endregion

        #region [Notification]
        // Get All
        public static ResultDTO GetAllNotification(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var count = new SqlParameter("Count", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                BODataListDTO Items = new BODataListDTO();
                Items.Items = dbContext.Database.SqlQuery<BOResponseDto>("EXEC [dbo].[sp_BO_Notification_GetAll] @SessionKey, @Count out, @errorCode out",
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    count,
                    errorCode).Skip((obj.PageIndex - 1) * obj.PageCount).Take(obj.PageCount).ToList<BOResponseDto>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                if (result.StatusCode == 0)
                {
                    Items.Total = int.Parse(count.Value.ToString(), 0);
                    result.Details = Items;
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }
        // Add Item
        public static ResultDTO AddNotification(this IEntityBaseRepository<Admin> repository, BONotificationItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {

                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Notification_Add] @Title,@Content,@Order,@Active,@SessionKey, @errorCode out",
              new SqlParameter("Title", DB.SafeSQL(obj.Title)),
              new SqlParameter("Content", DB.SafeSQL(obj.Content)),
              new SqlParameter("Order", obj.Order),
              new SqlParameter("Active", obj.Active),
              new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
              errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Edit Item
        public static ResultDTO UpdateNotificationByID(this IEntityBaseRepository<Admin> repository, BONotificationItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Notification_Update] @ID,@Title,@Content,@Order,@Active,@SessionKey, @errorCode out",
                 new SqlParameter("ID", obj.ID),
                 new SqlParameter("Title", DB.SafeSQL(obj.Title)),
                 new SqlParameter("Content", DB.SafeSQL(obj.Content)),
                 new SqlParameter("Order", obj.Order),
                 new SqlParameter("Active", obj.Active),
                 new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                 errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Delete Item
        public static ResultDTO DeleteNotificationByID(this IEntityBaseRepository<Admin> repository, RequestViewDetaiDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Notification_Delete] @ID,@SessionKey, @errorCode out",
               new SqlParameter("ID", obj.ID),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        public static ResultDTO GetNotificationInfoByID(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                result.Details = dbContext.Database.SqlQuery<BODocumentItem1DTO>("EXEC [dbo].[sp_BO_Notification_GetInfoByID] @ID,@SessionKey, @errorCode out",
                    new SqlParameter("ID", obj.ID),
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    errorCode).FirstOrDefault<BODocumentItem1DTO>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();

            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }
        #endregion

        #region [IntroPage]
        // Get All
        public static ResultDTO GetAllIntroPage(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var count = new SqlParameter("Count", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                BODataListDTO Items = new BODataListDTO();
                Items.Items = dbContext.Database.SqlQuery<BOResponseDto>("EXEC [dbo].[sp_BO_IntroPage_GetAll] @SessionKey, @Count out, @errorCode out",
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    count,
                    errorCode).Skip((obj.PageIndex - 1) * obj.PageCount).Take(obj.PageCount).ToList<BOResponseDto>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                if (result.StatusCode == 0)
                {
                    Items.Total = int.Parse(count.Value.ToString(), 0);
                    result.Details = Items;
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }
        // Add Item
        public static ResultDTO AddIntroPage(this IEntityBaseRepository<Admin> repository, BOIntroPageItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_IntroPage_Add] @Key,@Value,@Description,@SessionKey, @errorCode out",
              new SqlParameter("Key", DB.SafeSQL(obj.Key)),
              new SqlParameter("Value", DB.SafeSQL(obj.Value)),
              new SqlParameter("Description", DB.SafeSQL(obj.Description)),
              new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
              errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Edit Item
        public static ResultDTO UpdateIntroPageByID(this IEntityBaseRepository<Admin> repository, BOIntroPageItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_IntroPage_Update] @ID,@Key,@Value,@Description,@SessionKey, @errorCode out",
             new SqlParameter("ID", obj.ID),
             new SqlParameter("Key", DB.SafeSQL(obj.Key)),
             new SqlParameter("Value", DB.SafeSQL(obj.Value)),
             new SqlParameter("Description", DB.SafeSQL(obj.Description)),
             new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
             errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Delete Item
        public static ResultDTO DeleteIntroPageByID(this IEntityBaseRepository<Admin> repository, RequestViewDetaiDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_IntroPage_Delete] @ID,@SessionKey, @errorCode out",
               new SqlParameter("ID", obj.ID),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        #endregion

        #region [Comment]
        // Get All
        public static ResultDTO GetAllComment(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var count = new SqlParameter("Count", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                BODataListDTO Items = new BODataListDTO();
                Items.Items = dbContext.Database.SqlQuery<BOResponseDto>("EXEC [dbo].[sp_BO_Comment_GetAll] @SessionKey, @Count out, @errorCode out",
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    count,
                    errorCode).Skip((obj.PageIndex - 1) * obj.PageCount).Take(obj.PageCount).ToList<BOResponseDto>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                if (result.StatusCode == 0)
                {
                    Items.Total = int.Parse(count.Value.ToString(), 0);
                    result.Details = Items;
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }
        // Add Item
        public static ResultDTO AddComment(this IEntityBaseRepository<Admin> repository, BOCommentItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Comment_Add] @Title,@Content,@Order,@Active,@SessionKey, @errorCode out",
              new SqlParameter("Title", DB.SafeSQL(obj.Title)),
              new SqlParameter("Content", DB.SafeSQL(obj.Content)),
              new SqlParameter("Order", obj.Order),
              new SqlParameter("Active", obj.Active),
              new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
              errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Edit Item
        public static ResultDTO UpdateCommentByID(this IEntityBaseRepository<Admin> repository, BOCommentItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Comment_Update] @ID,@Title,@Content,@Order,@Active,@SessionKey, @errorCode out",
               new SqlParameter("ID", obj.ID),
               new SqlParameter("Title", DB.SafeSQL(obj.Title)),
               new SqlParameter("Content", DB.SafeSQL(obj.Content)),
               new SqlParameter("Order", obj.Order),
               new SqlParameter("Active", obj.Active),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Delete Item
        public static ResultDTO DeleteCommentByID(this IEntityBaseRepository<Admin> repository, RequestViewDetaiDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Comment_Delete] @ID,@SessionKey, @errorCode out",
               new SqlParameter("ID", obj.ID),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        #endregion

        #region [Question]
        // Get All
        public static ResultDTO GetAllQuestion(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var count = new SqlParameter("Count", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                BODataListDTO Items = new BODataListDTO();
                Items.Items = dbContext.Database.SqlQuery<BOResponseDto>("EXEC [dbo].[sp_BO_Question_GetAll] @SessionKey, @Count out, @errorCode out",
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    count,
                    errorCode).Skip((obj.PageIndex - 1) * obj.PageCount).Take(obj.PageCount).ToList<BOResponseDto>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                if (result.StatusCode == 0)
                {
                    Items.Total = int.Parse(count.Value.ToString(), 0);
                    result.Details = Items;
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }
        // Add Item
        public static ResultDTO AddQuestion(this IEntityBaseRepository<Admin> repository, BOQuestionItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Question_Add] @Title,@Content,@Order,@Active,@SessionKey, @errorCode out",
             new SqlParameter("Title", DB.SafeSQL(obj.Title)),
             new SqlParameter("Content", DB.SafeSQL(obj.Content)),
             new SqlParameter("Order", obj.Order),
             new SqlParameter("Active", obj.Active),
             new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
             errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Edit Item
        public static ResultDTO UpdateQuestionByID(this IEntityBaseRepository<Admin> repository, BOQuestionItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Question_Update] @ID,@Title,@Content,@Order,@Active,@SessionKey, @errorCode out",
               new SqlParameter("ID", obj.ID),
               new SqlParameter("Title", DB.SafeSQL(obj.Title)),
               new SqlParameter("Content", DB.SafeSQL(obj.Content)),
               new SqlParameter("Order", obj.Order),
               new SqlParameter("Active", obj.Active),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Delete Item
        public static ResultDTO DeleteQuestionByID(this IEntityBaseRepository<Admin> repository, RequestViewDetaiDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_Question_Delete] @ID,@SessionKey, @errorCode out",
               new SqlParameter("ID", obj.ID),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        #endregion

        #region [AffiliateLinks]
        // Get All
        public static ResultDTO GetAllAffiliateLinks(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var count = new SqlParameter("Count", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                BODataListDTO Items = new BODataListDTO();
                Items.Items = dbContext.Database.SqlQuery<BOResponseDto>("EXEC [dbo].[sp_BO_AffiliateLinks_GetAll] @SessionKey, @Count out, @errorCode out",
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    count,
                    errorCode).Skip((obj.PageIndex - 1) * obj.PageCount).Take(obj.PageCount).ToList<BOResponseDto>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                if (result.StatusCode == 0)
                {
                    Items.Total = int.Parse(count.Value.ToString(), 0);
                    result.Details = Items;
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }
        // Add Item
        public static ResultDTO AddAffiliateLinks(this IEntityBaseRepository<Admin> repository, BOAffiliateLinksItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_AffiliateLinks_Add] @Title,@Content,@Order,@Active,@SessionKey, @errorCode out",
           new SqlParameter("Title", DB.SafeSQL(obj.Title)),
           new SqlParameter("Content", DB.SafeSQL(obj.Content)),
           new SqlParameter("Order", obj.Order),
           new SqlParameter("Active", obj.Active),
           new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
           errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Edit Item
        public static ResultDTO UpdateAffiliateLinksByID(this IEntityBaseRepository<Admin> repository, BOAffiliateLinksItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_AffiliateLinks_Update] @ID,@Title,@Content,@Order,@Active,@SessionKey, @errorCode out",
               new SqlParameter("ID", obj.ID),
               new SqlParameter("Title", DB.SafeSQL(obj.Title)),
               new SqlParameter("Content", DB.SafeSQL(obj.Content)),
               new SqlParameter("Order", obj.Order),
               new SqlParameter("Active", obj.Active),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Delete Item
        public static ResultDTO DeleteAffiliateLinksByID(this IEntityBaseRepository<Admin> repository, RequestViewDetaiDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_AffiliateLinks_Delete] @ID,@SessionKey, @errorCode out",
               new SqlParameter("ID", obj.ID),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        #endregion

        #region [AffiliateLink]
        // Get All
        public static ResultDTO GetAllAffiliateLink(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var count = new SqlParameter("Count", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            try
            {
                BODataListDTO Items = new BODataListDTO();
                Items.Items = dbContext.Database.SqlQuery<BOResponseDto>("EXEC [dbo].[sp_BO_AffiliateLink_GetAll] @CatID, @SessionKey, @Count out, @errorCode out",
                     new SqlParameter("CatID", obj.ID),
                    new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                    count,
                    errorCode).Skip((obj.PageIndex - 1) * obj.PageCount).Take(obj.PageCount).ToList<BOResponseDto>();
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                if (result.StatusCode == 0)
                {
                    Items.Total = int.Parse(count.Value.ToString(), 0);
                    result.Details = Items;
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.StatusMsg = ex.Message;
            }

            return result;
        }
        // Add Item
        public static ResultDTO AddAffiliateLink(this IEntityBaseRepository<Admin> repository, BOAffiliateLinkItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_AffiliateLink_Add] @Title,@Content,@AffiliateLinksID,@Order,@Active,@SessionKey, @errorCode out",
           new SqlParameter("Title", DB.SafeSQL(obj.Title)),
           new SqlParameter("Content", DB.SafeSQL(obj.Content)),
           new SqlParameter("AffiliateLinksID", obj.AffiliateLinksID),
           new SqlParameter("Order", obj.Order),
           new SqlParameter("Active", obj.Active),
           new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
           errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Edit Item
        public static ResultDTO UpdateAffiliateLinkByID(this IEntityBaseRepository<Admin> repository, BOAffiliateLinkItemDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_AffiliateLink_Update] @ID,@Title,@Content,@AffiliateLinksID,@Order,@Active,@SessionKey, @errorCode out",
                     new SqlParameter("ID", obj.ID),
           new SqlParameter("Title", DB.SafeSQL(obj.Title)),
           new SqlParameter("Content", DB.SafeSQL(obj.Content)),
           new SqlParameter("AffiliateLinksID", obj.AffiliateLinksID),
           new SqlParameter("Order", obj.Order),
           new SqlParameter("Active", obj.Active),
           new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
           errorCode);
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        // Delete Item
        public static ResultDTO DeleteAffiliateLinkByID(this IEntityBaseRepository<Admin> repository, RequestViewDetaiDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_AffiliateLink_Delete] @ID,@SessionKey, @errorCode out",
               new SqlParameter("ID", obj.ID),
               new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
               errorCode);

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        #endregion
    }
}

