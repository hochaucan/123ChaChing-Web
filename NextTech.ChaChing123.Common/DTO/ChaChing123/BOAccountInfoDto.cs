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
        public string AccountType { get; set; }
        public string Status { get; set; }
        public int IsLock { get; set; }
        public int IsLockAffilate { get; set; }
        public int RenewalNo { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Note { get; set; }
        public decimal ApprovedAmount { get; set; }
        public decimal PendingAmount { get; set; }
        public decimal Amount { get; set; }
        public decimal WithdrawalAmount { get; set; }
        public decimal RequestWithDrawallNumber { get; set; }

        private BOAccountInfoDTO()
        {
            FullName = string.Empty;
            UserName = string.Empty;
            Email = string.Empty;
            Phone = string.Empty;
            RefCode = string.Empty;
            AccountType = string.Empty;
            Status = string.Empty;
            IsLock = 1;
            IsLockAffilate = 1;
            RenewalNo = 0;
            Note = string.Empty;
            CreatedDate = DateTime.Now;
            ApprovedAmount = 0;
            PendingAmount = 0;
            Amount = 0;
            WithdrawalAmount = 0;
            RequestWithDrawallNumber = 0;
        }
    }
}
