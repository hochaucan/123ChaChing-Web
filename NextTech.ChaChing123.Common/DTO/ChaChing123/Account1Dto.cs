using System;

namespace NextTech.ChaChing123.Common.Models
{
    public class AccountInfo1DTO 
    {
        public string FullName { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string AvatarPath { get; set; }

        public string RegisterDate { get; set; }

        public AccountInfo1DTO()
        {
            this.FullName = string.Empty;
            this.Email = string.Empty;
            this.UserName = string.Empty;
            this.Email = string.Empty;
            this.Phone = string.Empty;
            this.RegisterDate = string.Empty;
            this.AvatarPath = string.Empty;
        }

    }
}
