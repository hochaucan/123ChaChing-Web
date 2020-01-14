using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class RegisterDTO
    {
        
        public string FullName { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Password { get; set; }

        public int AccountType { get; set; }

        public string RefCode { get; set; }

        public string ContractNo { get; set; }

        public string AvartaPath { get; set; }

        public string CreatedBy { get; set; }

        private RegisterDTO()
        {
            FullName = string.Empty;
            UserName = string.Empty;
            Email = string.Empty;
            Phone = string.Empty;
            Password = string.Empty;
            AccountType = 0;
            RefCode	=string.Empty;
            ContractNo	=string.Empty;
            AvartaPath	=string.Empty;
            CreatedBy = string.Empty;
            
        }
    }
}
