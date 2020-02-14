using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class FunnalPageItemDTO
    {
        public int ID { get; set; }
        public string PageName { get; set; }
        public string Link { get; set; }
        public int Status { get; set; }

        private FunnalPageItemDTO()
        {
            ID = 0;
            Status = 0;
            PageName = string.Empty;
            Link = string.Empty;
        }
    }
}
