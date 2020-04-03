using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class BOIntroPageItem1DTO
    {
        public int ID { get; set; }

        public string Key { get; set; }

        public string Value { get; set; }

        public string Description { get; set; }

        
        private BOIntroPageItem1DTO()
        {
            ID = -1;
            Key = string.Empty;
            Value = string.Empty;
            Description = string.Empty;
        }
    }
}
