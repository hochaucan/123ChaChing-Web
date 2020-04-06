using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class BOCommissionReportItemDto
    {
        public string CreatedDate { get; set; }
        public string Account { get; set; }
        public string ContractNo { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int AccountType { get; set; }
        public string AccountTypeName { get; set; }
        public int Status { get; set; }
        public string StatusName { get; set; }
        public decimal PendingAmount { get; set; }
        public int RequestWithDrawallCount { get; set; }
        public decimal Amount { get; set; }

        private BOCommissionReportItemDto()
        {
            CreatedDate = string.Empty;
            Account = string.Empty;
            ContractNo = string.Empty;
            FullName = string.Empty;
            Email = string.Empty;
            Phone = string.Empty;
            AccountType = 0;
            AccountTypeName = string.Empty;
            Status = 0;
            StatusName = string.Empty;
            PendingAmount = 0;
            RequestWithDrawallCount = 0;
            Amount = 0;

        }
    }
}
