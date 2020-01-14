using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class RequestWithdrawalDTO
    {
        public string UserName { get; set; }
        public string BeneAccountName { get; set; }
        public string BeneBankName { get; set; }
        public string BeneAccountNo { get; set; }
        public string Amount { get; set; }
        public string Remarks { get; set; }
        public string SessionKey { get; set; }

        private RequestWithdrawalDTO()
        {
            UserName = string.Empty;
            BeneAccountName = string.Empty;
            BeneBankName = string.Empty;
            BeneAccountNo = string.Empty;
            Amount = string.Empty;
            Remarks = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
