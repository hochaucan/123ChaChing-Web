using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class BOTitleTemplateDTO
    {
        
        public int ID { get; set; }

        public string Title { get; set; }

        public int Order { get; set; }

        public int Active { get; set; }

        public string UserName { get; set; }

        public string SessionKey { get; set; }

        private BOTitleTemplateDTO()
        {
            ID = 0;
            Title = string.Empty;
            UserName = string.Empty;
            SessionKey = string.Empty;
            Order = 0;
            Active = 0;
        }
    }
}
