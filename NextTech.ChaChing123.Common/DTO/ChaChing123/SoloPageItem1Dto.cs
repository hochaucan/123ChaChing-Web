using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class SoloPageItem1DTO
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string Link { get; set; }
        public int Status { get; set; }

        private SoloPageItem1DTO()
        {
            ID = 0;
            Status = 0;
            Title = string.Empty;
            SubTitle = string.Empty;
            Link = string.Empty;
        }
    }
}
