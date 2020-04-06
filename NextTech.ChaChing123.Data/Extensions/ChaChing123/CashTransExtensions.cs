namespace NextTech.ChaChing123.Data.Extensions
{
    using Entities;
    using NextTech.ChaChing123.Core.Utilities.Security;
    using System.Data.SqlClient;

    public class CashTransExtensions
    {
        public bool CashLog(string requestinfo, string Error_code, string Token, string Description, string Checkout_url, string ContractNo, string SessionKey)
        {
            ApplicationContext dbContext;
            dbContext = new ApplicationContext();
            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_Cash_LogInfo] @Requestinfo,@Error_code,@Token,@Description,@Checkout_url,@ContractNo,@SessionKey,@errorCode out",
                        new SqlParameter("Requestinfo", DB.SafeSQL(requestinfo)),
                     new SqlParameter("Error_code", DB.SafeSQL(Error_code)),
                     new SqlParameter("Token", DB.SafeSQL(Token)),
                     new SqlParameter("Description", DB.SafeSQL(Description)),
                     new SqlParameter("Checkout_url", DB.SafeSQL(Checkout_url)),
                     new SqlParameter("ContractNo", DB.SafeSQL(ContractNo)),
                        new SqlParameter("SessionKey", DB.SafeSQL(SessionKey)), errorCode);
            return true;
        }
        public bool UpdateCashInfoByNL(int error_code, string token, string order_code, int order_id)
        {
            ApplicationContext dbContext;
            dbContext = new ApplicationContext();
            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_Cash_UpdateCashInfoByNL] @error_code,@token,@order_code,@order_id,@errorCode out",
                        new SqlParameter("error_code", error_code),
                     new SqlParameter("token", DB.SafeSQL(token)),
                     new SqlParameter("order_code", DB.SafeSQL(order_code)),
                        new SqlParameter("order_id", order_id), errorCode);
            return true;
        }

    }
}

