using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class BOAccountItemDTO
    {
        public int ID { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string RefCode { get; set; }
        public string AccountType { get; set; }
        public string Status { get; set; }
        public string IsLock { get; set; }
        public string IsLockAffilate { get; set; }
        public string RenewalNo { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Note { get; set; }

        private BOAccountItemDTO()
        {
            FullName = string.Empty;
            UserName = string.Empty;
            Email = string.Empty;
            Phone = string.Empty;
            RefCode = string.Empty;
            AccountType = string.Empty;
            Status = string.Empty;
            IsLock = string.Empty;
            IsLockAffilate = string.Empty;
            RenewalNo = string.Empty;
            Note = string.Empty;
            CreatedDate = DateTime.Now;
        }
    }
}
