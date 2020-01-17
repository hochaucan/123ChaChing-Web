/// <summary>
/// <author>Ngô Tấn Phúc</author>
/// <description>Created date: </description>
/// <revision history>Version: 1.0.1</revision history>
/// </summary>
using NextTech.ChaChing123.Common.Models;
using NextTech.ChaChing123.Common.Utilities;
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
    using System.Collections.Generic;
    using System.Data;

    public static class AffiliateExtensions
    {
        #region 
        public static ResultDTO GetOrderList(this IEntityBaseRepository<Affiliate> repository, RequestOrderListDTO obj)
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
                    var items = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_GetOrderList] @SessionKey,@KeyWord, @PaymentState,@AffiliateState, @AffiliateAccount, @errorCode out",
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        new SqlParameter("KeyWord", DB.SafeSQL(obj.KeyWord)),
                        new SqlParameter("PaymentState", obj.PaymentState),
                        new SqlParameter("AffiliateState", obj.AffiliateState),
                        new SqlParameter("AffiliateAccount", obj.AffiliateAccount),
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

        public static ResultDTO UpdatePaymentState(this IEntityBaseRepository<Affiliate> repository, PaymentContractDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_UpdatePaymentState] @UserName,@ContractNo, @SessionKey,@PaymentState, @errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("ContractNo", DB.SafeSQL(obj.ContractNo)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                         new SqlParameter("PaymentState", obj.PaymentState),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }

        public static ResultDTO UpdatePaymentAffiliateState(this IEntityBaseRepository<Affiliate> repository, PaymentAffiliateDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_UpdatePaymentAffiliateState] @UserName,@ContractNo, @SessionKey,@AffiliateState, @errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("ContractNo", DB.SafeSQL(obj.ContractNo)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                         new SqlParameter("AffiliateState", obj.AffiliateState),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }

        public static ResultDTO GetWalletInfoByAccount(this IEntityBaseRepository<Affiliate> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.SqlQuery<WalletInfoDTO>("EXEC [dbo].[sp_GetWalletInfoByAccount] @UserName,@SessionKey,@ErrorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode).FirstOrDefault();
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();
            return result;
        }

        #endregion 

        public static ResultDTO GetAffiliateInfoByAccount(this IEntityBaseRepository<Affiliate> repository, RequestAffiliateInfoDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            result.Details = dbContext.Database.SqlQuery<AfiliateAlertDTO>("EXEC [dbo].[sp_GetAffiliateInfoByAccount] @UserName,@SessionKey, @FromDate,@ToDate, @errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        new SqlParameter("FromDate", DB.SafeSQL(obj.FromDate)),
                        new SqlParameter("ToDate", DB.SafeSQL(obj.ToDate)),
                        errorCode).ToList<AfiliateAlertDTO>();
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();
            return result;
        }

        public static ResultDTO GetAffiliateCodeByAccount(this IEntityBaseRepository<Affiliate> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.SqlQuery<string>("EXEC [dbo].[sp_GetAffiliateCodeByAccount] @UserName,@SessionKey,@errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode).FirstOrDefault();
            
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();
            
            return result;
        }

        public static ResultDTO GetWithDrawallInfoByAccount(this IEntityBaseRepository<Affiliate> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_GetWithDrawallInfoByAccount] @UserName,@SessionKey,@errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }

        public static ResultDTO RequestWithDrawall(this IEntityBaseRepository<Affiliate> repository, RequestWithdrawalDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            var lengthPass = int.Parse(Common.Utilities.Common.GetConfigValue("LengthPass"));
            string strContractNo = PasswordGenerator.generatePassword(lengthPass, false, true, false);

            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_GetWithDrawallInfoByAccount] @SessionKey,@UserReceiver,@BeneAccountName,@BeneBankName,@BeneAccountNo,@Amount,@Remarks,@ContractNo,@errorCode out",
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        new SqlParameter("UserReceiver", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("BeneAccountName", DB.SafeSQL(obj.BeneAccountName)),
                        new SqlParameter("BeneBankName", DB.SafeSQL(obj.BeneBankName)),
                        new SqlParameter("BeneAccountNo", DB.SafeSQL(obj.BeneAccountNo)),
                        new SqlParameter("Amount", DB.SafeSQL(obj.Amount)),
                        new SqlParameter("Remarks", DB.SafeSQL(obj.Remarks)),
                        new SqlParameter("ContractNo", strContractNo),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }

        public static ResultDTO GetSummaryReportByAccount(this IEntityBaseRepository<Affiliate> repository, SummaryRequestDTO obj)
        {
            
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.SqlQuery<AffiliateOfMonthDTO>("EXEC [dbo].[sp_GetSummaryReportByAccount] @StartList,@EndList, @UserName,@SessionKey,@errorCode out",
                        new SqlParameter("StartList", DB.SafeSQL(obj.StartList)),
                        new SqlParameter("EndList", DB.SafeSQL(obj.EndList)),
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode).ToList<AffiliateOfMonthDTO>();
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();
            return result;

        }

        public static ResultDTO GetAfiliateAlertByAccount(this IEntityBaseRepository<Affiliate> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            result.Details = dbContext.Database.SqlQuery<AfiliateAlertDTO>("EXEC [dbo].[sp_GetAfiliateAlertByAccount] @UserName,@SessionKey, @errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode).OrderByDescending(p=>p.RegisterDate).ToList<AfiliateAlertDTO>();
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();
            return result;

        }
        public static ResultDTO GetAfiliateListByAccount(this IEntityBaseRepository<Affiliate> repository, RequestOrderListDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            result.Details = dbContext.Database.SqlQuery<AfiliateItemDTO>("EXEC [dbo].[sp_GetAfiliateListByAccount] @UserName,@SessionKey, @errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode).ToList<AfiliateItemDTO>();
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();
            return result;

        }

    }
}
