using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class CheckLoginDTO
    {
        
        public string UserName { get; set; }

        public string SessionKey { get; set; }

        private CheckLoginDTO()
        {
            UserName = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
