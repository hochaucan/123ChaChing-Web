using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class BOAccountInfoDTO
    {
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string RefCode { get; set; }
        public int AccountType { get; set; }
        public string AccountTypeName { get; set; }        
        public int Status { get; set; }
        public string StatusName { get; set; }        
        public int IsLock { get; set; }
        public int IsLockAffilate { get; set; }
        public int RenewalNo { get; set; }
        public string CreatedDate { get; set; }
        public string Note { get; set; }
        public decimal ApprovedAmount { get; set; }
        public decimal PendingAmount { get; set; }
        public decimal Amount { get; set; }
        public decimal WithdrawalAmount { get; set; }
        public int RequestWithDrawallNumber { get; set; }
        public decimal TotalAmount { get; set; }
        private BOAccountInfoDTO()
        {
            FullName = string.Empty;
            UserName = string.Empty;
            Email = string.Empty;
            Phone = string.Empty;
            RefCode = string.Empty;
            AccountType = -1;
            Status = -1;
            IsLock = 1;
            IsLockAffilate = 1;
            RenewalNo = 0;
            Note = string.Empty;
            CreatedDate = string.Empty;
            ApprovedAmount = 0;
            PendingAmount = 0;
            Amount = 0;
            WithdrawalAmount = 0;
            TotalAmount = 0;
            RequestWithDrawallNumber = 0;
            AccountTypeName = string.Empty;
            StatusName = string.Empty;
        }
    }
}
