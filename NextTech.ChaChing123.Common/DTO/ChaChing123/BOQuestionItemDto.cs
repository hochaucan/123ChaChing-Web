using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class BOQuestionItemDTO
    {
        public int ID { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public int Order { get; set; }

        public int Active { get; set; }

        public string SessionKey { get; set; }
        
        private BOQuestionItemDTO()
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
