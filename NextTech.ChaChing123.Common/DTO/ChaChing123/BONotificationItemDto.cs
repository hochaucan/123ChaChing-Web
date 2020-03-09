using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class BONotificationItemDTO
    {
        public int ID { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public int Order { get; set; }

        public int Active { get; set; }

        public string SessionKey { get; set; }
        
        private BONotificationItemDTO()
        {
            ID = -1;
            Order = 0;
            Active = 1;
            Title = string.Empty;
            Content = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
