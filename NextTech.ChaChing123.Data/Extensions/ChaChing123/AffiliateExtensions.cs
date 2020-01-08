/// <summary>
/// <author>Ngô Tấn Phúc</author>
/// <description>Created date: </description>
/// <revision history>Version: 1.0.1</revision history>
/// </summary>
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

    public static class AffiliateExtensions
    {
        public static ResultDTO GetOrderList(this IEntityBaseRepository<Affiliate> repository, OrderListSearchDto obj)
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

            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_UpdatePaymentState] @UserName,@ContractNo, @SessionKey,@AffiliateState, @errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("ContractNo", DB.SafeSQL(obj.ContractNo)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                         new SqlParameter("AffiliateState", obj.AffiliateState),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }

        public static ResultDTO GetAffiliateInfoByAccount(this IEntityBaseRepository<Affiliate> repository, PaymentAffiliateDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_GetAffiliateInfoByAccount] @UserName,@ContractNo, @SessionKey,@AffiliateState, @errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("ContractNo", DB.SafeSQL(obj.ContractNo)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                         new SqlParameter("AffiliateState", obj.AffiliateState),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
    }
}
