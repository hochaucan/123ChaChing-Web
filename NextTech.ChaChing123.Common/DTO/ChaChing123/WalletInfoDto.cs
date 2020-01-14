using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class WalletInfoDTO
    {
        public decimal Amount { get; set; }
        public int AffiliatePending { get; set; }
        public int AffiliateApproved { get; set; }
        public decimal AmountPending { get; set; }
        public decimal AmountApproved { get; set; }

        private WalletInfoDTO()
        {
            Amount = 0;
            AffiliatePending = 0;
            AffiliateApproved = 0;
            AmountPending = 0;
            AmountApproved = 0;
        }
    }
}
