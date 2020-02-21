using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class BOOrderItemDto
    {
        public string ContractNo { get; set; }
        public string CreatedDate { get; set; }
        public string CustomerAccount { get; set; }
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerPhone { get; set; }
        public int PaymentStatus { get; set; }
        public string PaymentStatusName { get; set; }
        public int AccountType { get; set; }
        public string AccountTypeName { get; set; }
        public decimal CustomerAmount { get; set; }
        public decimal AffiliateAmount { get; set; }
        public string AffiliateAccount { get; set; }
        public string AffiliateName { get; set; }
        public int AffiliateStatus { get; set; }
        public string AffiliateStatusName { get; set; }

        private BOOrderItemDto()
        {
            ContractNo = string.Empty;
            CreatedDate = string.Empty;
            CustomerAccount = string.Empty;
            CustomerName = string.Empty;
            CustomerEmail = string.Empty;
            CustomerPhone = string.Empty;
            PaymentStatus = 0;
            PaymentStatusName = string.Empty;
            AccountType = 0;
            AccountTypeName = string.Empty;
            CustomerAmount = 0;
            AffiliateAmount = 0;
            AffiliateAccount = string.Empty;
            AffiliateName = string.Empty;
            AffiliateStatus = 0;
            AffiliateStatusName = string.Empty;

        }
    }
}
