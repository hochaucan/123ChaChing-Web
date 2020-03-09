using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class BOIntroPageItemDTO
    {
        public int ID { get; set; }

        public string Key { get; set; }

        public string Value { get; set; }

        public string Description { get; set; }

        public string SessionKey { get; set; }
        
        private BOIntroPageItemDTO()
        {
            ID = -1;
            Key = string.Empty;
            Value = string.Empty;
            Description = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
