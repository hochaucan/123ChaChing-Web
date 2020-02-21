using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class RequestNextSoloDTO
    {
        public string UserName { get; set; }

        public string SessionKey { get; set; }

        public int FunnalID { get; set; }

        public int SoloID { get; set; }
        public int IsNext { get; set; }
        
        private RequestNextSoloDTO()
        {
            FunnalID = -1;
            SoloID = -1;
            IsNext =0;
            UserName = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
