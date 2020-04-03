using System;

namespace NextTech.ChaChing123.Common.Models
{
    public class BOQuickRepliesItem1DTO
    {
        public int ID { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public int Order { get; set; }

        public int Type { get; set; }

        private BOQuickRepliesItem1DTO()
        {
            ID = -1;
            Order = 0;
            Type = 0;
            Title = string.Empty;
            Content = string.Empty;
        }
    }
}
