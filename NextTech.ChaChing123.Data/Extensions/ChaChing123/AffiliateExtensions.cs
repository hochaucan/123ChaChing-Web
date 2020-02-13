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
