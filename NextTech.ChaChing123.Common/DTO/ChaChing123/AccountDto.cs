using System;

namespace NextTech.ChaChing123.Common.Models
{
    public class AccountInfoDTO 
    {
        public string FullName { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public int AccountType { get; set; }

        public int Status { get; set; }

        public bool IsLock { get; set; }

        public bool IsLockAffilate { get; set; }

        public string SessionKey { get; set; }

        public string AvartaPath { get; set; }

        public string RegisterDate { get; set; }

        public AccountInfoDTO()
        {
            this.FullName = string.Empty;
            this.Email = string.Empty;
            this.UserName = string.Empty;
            this.Email = string.Empty;
            this.Phone = string.Empty;
            this.AccountType = 1;
            this.Status = 1;
            this.RegisterDate = string.Empty;
            this.SessionKey = string.Empty;
            this.AvartaPath = string.Empty;
        }

    }
}
