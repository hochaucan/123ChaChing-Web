using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class LeadsDTO
    {
        public string UserName { get; set; }

        public string SessionKey { get; set; }

        public int PageIndex { get; set; }

        public int PageCount { get; set; }

        private LeadsDTO()
        {
            PageIndex = -1;
            PageCount = -1;
            UserName = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
