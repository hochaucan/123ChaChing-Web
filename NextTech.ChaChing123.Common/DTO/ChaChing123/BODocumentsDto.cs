using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class BODocumentsItemDTO
    {
        public int ID { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int Order { get; set; }

        public int Active { get; set; }

        public string SessionKey { get; set; }
        
        private BODocumentsItemDTO()
        {
            ID = -1;
            Order = 0;
            Active = 1;
            Title = string.Empty;
            Description = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
