using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class WalletInfoOfAccDTO
    {
        public string UserName { get; set; }

        public string SessionKey { get; set; }


        private WalletInfoOfAccDTO()
        {
            UserName = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
