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
        public int AccountType { get; set; }
        public string AccountTypeName { get; set; }
        public int Status { get; set; }
        public string StatusName { get; set; }
        public int IsLock { get; set; }
        public int IsLockAffilate { get; set; }
        public int RenewalNo { get; set; }
        public string CreatedDate { get; set; }
        public string Note { get; set; }
        
        private BOAccountItemDTO()
        {
            StatusName = string.Empty;
            AccountTypeName = string.Empty;
            FullName = string.Empty;
            UserName = string.Empty;
            Email = string.Empty;
            Phone = string.Empty;
            RefCode = string.Empty;
            AccountType = 0;
            Status = 0;
            IsLock = 1;
            IsLockAffilate = 1;
            RenewalNo = 0;
            Note = string.Empty;
            CreatedDate = string.Empty;
        }
    }
}
