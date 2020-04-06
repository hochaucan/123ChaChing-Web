using Microsoft.Practices.EnterpriseLibrary.Logging;

using System.Diagnostics;

namespace NextTech.ChaChing123.Business.Utilities
{
    using Entities;
    using System;
    using NextTech.ChaChing123.Data.Extensions;

    /// <summary>
    /// Class AppLog.
    /// </summary>
    /// <seealso cref="BTMU.APF.Utilities.BaseUtilities" />
    public class CashTrans
    {
        
        public static void CashLog(string requestinfo, string Error_code, string Token, string Description, string Checkout_url, string ContractNo, string SessionKey)
        {
            try
            {
                CashTransExtensions SysAudit = new CashTransExtensions();
                SysAudit.CashLog(requestinfo, Error_code, Token, Description, Checkout_url, ContractNo, SessionKey);

            }
            catch (Exception ex)
            {
                Logger.LogError("Method WriteLog:" + ex.Message);
            }
        }
        public static void UpdateCashInfoByNL(int error_code, string token, string order_code, int order_id)
        {
            try
            {
                CashTransExtensions SysAudit = new CashTransExtensions();
                SysAudit.UpdateCashInfoByNL(error_code, token, order_code, order_id);

            }
            catch (Exception ex)
            {
                Logger.LogError("Method WriteLog:" + ex.Message);
            }
        }
    }
}
