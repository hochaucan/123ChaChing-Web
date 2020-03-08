using System;

namespace NextTech.ChaChing123.Common.Models
{
    public class BOBlockTabMarketingItemDTO
    {
        public int ID { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }
        public string ImagePath { get; set; }
        public string Link { get; set; }
        public string ResourcePath { get; set; }
        public int Style { get; set; }

        public int Order { get; set; }

        public int Active { get; set; }

        public string SessionKey { get; set; }

        private BOBlockTabMarketingItemDTO()
        {
            ID = -1;
            Order = 0;
            Active = 1;
            Title = string.Empty;
            Content = string.Empty;
            SessionKey = string.Empty;
            ImagePath = string.Empty;
            Link = string.Empty;
            ResourcePath = string.Empty;
            Style = -1;
        }
    }
}
