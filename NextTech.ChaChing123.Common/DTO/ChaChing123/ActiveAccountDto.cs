using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class ActiveAccountDTO
    {
        
        public string UserName { get; set; }

        public string SessionKey { get; set; }

        public int Status { get; set; }

        private ActiveAccountDTO()
        {
            Status = 0;
            UserName = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
