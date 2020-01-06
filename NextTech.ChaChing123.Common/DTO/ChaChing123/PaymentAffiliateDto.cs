using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class PaymentContractDTO
    {
        public string UserName { get; set; }

        public string ContractNo { get; set; }

        public string SessionKey { get; set; }

        public int PaymentState { get; set; }

        private PaymentContractDTO()
        {
            PaymentState = 0;
            UserName = string.Empty;
            SessionKey = string.Empty;
            ContractNo = string.Empty;
        }
    }
}
