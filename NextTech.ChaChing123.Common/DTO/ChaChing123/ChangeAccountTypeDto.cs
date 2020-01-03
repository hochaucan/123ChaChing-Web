using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class ChangeAccountTypeDTO
    {
        
        public string UserName { get; set; }

        public string SessionKey { get; set; }

        public int AccountType { get; set; }

        private ChangeAccountTypeDTO()
        {
            AccountType = 0;
            UserName = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
