using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class WithdrawaltDTO
    {
        public string AccountName { get; set; }

        public string ContractNo { get; set; }

        public string SessionKey { get; set; }

        public int Status { get; set; }

        private WithdrawaltDTO()
        {
            Status = 0;
            AccountName = string.Empty;
            SessionKey = string.Empty;
            ContractNo = string.Empty;
        }
    }
}
