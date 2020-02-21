

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

            Items.Total = int.Parse(count.Value.ToString(), 0);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            result.Details = Items;
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
                    errorCode).Skip((obj.PageIndex-1) * obj.PageCount).Take(obj.PageCount).ToList<BOOrderItemDto>();
                Items.Total = int.Parse(count.Value.ToString(), 0); 
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                
                result.Details = Items;
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
        // No8=>TODO
        public static ResultDTO SetPasswodForAccount(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
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
        public static ResultDTO GetAffiliateListByAccount(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.SqlQuery<BOAccountInfo2DTO>("EXEC [dbo].[sp_BO_GetAffiliateListByAccount]  @AccountName,@SessionKey,@errorCode out",
                        new SqlParameter("AccountName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode).ToList<BOAccountInfo2DTO>();
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();
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

            result.Details = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_GetWithDrawallInfoByAccount] @UserName,@SessionKey,@errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

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

            result.Details = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_SummaryRevenueReport] @UserName,@SessionKey,@errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

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
        public static ResultDTO SumaryReportChart(this IEntityBaseRepository<Admin> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_BO_SumaryReportChart] @UserName,@SessionKey,@errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);
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
                result.Details=ex.Message;
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

        #region [Template]

        #region Leads
        public static ResultDTO GetAllLeads(this IEntityBaseRepository<Admin> repository, LeadsDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                if (obj.PageIndex != -1)
                {
                    result.Details = dbContext.Database.SqlQuery<LeadsItemDTO>("EXEC [dbo].[sp_GetAllLeads] @UserName, @SessionKey, @errorCode out",
                           new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                           new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                           errorCode).Skip(obj.PageIndex).Take(obj.PageCount).ToList<LeadsItemDTO>();
                }
                else
                {
                    result.Details = dbContext.Database.SqlQuery<LeadsItemDTO>("EXEC [dbo].[sp_GetAllLeads] @UserName, @SessionKey, @errorCode out",
                           new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                           new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                           errorCode).ToList<LeadsItemDTO>();
                }
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
        #endregion
    }
}
