using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class LogoutDTO
    {
        
        public string UserName { get; set; }

        public string SessionKey { get; set; }

        public int UserID { get; set; }

        private LogoutDTO()
        {
            UserID = 0;
            UserName = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
