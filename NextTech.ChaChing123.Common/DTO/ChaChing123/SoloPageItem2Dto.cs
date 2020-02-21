using System;

namespace NextTech.ChaChing123.Common.Models
{
    public class SoloPageItem2DTO
    {
        public int ID { get; set; }
        public string PageName { get; set; }
        public string Title { get; set; }
        private SoloPageItem2DTO()
        {
            ID = 0;
            Title = string.Empty;
            PageName = string.Empty;
        }
    }
}
