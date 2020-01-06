using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class LockAccountDTO
    {
        
        public string UserName { get; set; }

        public string SessionKey { get; set; }

        public int IsLock { get; set; }

        private LockAccountDTO()
        {
            IsLock = 0;
            UserName = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
