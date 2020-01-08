using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class PaymentAffiliateDTO
    {
        public string UserName { get; set; }

        public string ContractNo { get; set; }

        public string SessionKey { get; set; }

        public int AffiliateState { get; set; }

        private PaymentAffiliateDTO()
        {
            AffiliateState = 0;
            UserName = string.Empty;
            SessionKey = string.Empty;
            ContractNo = string.Empty;
        }
    }
}
