using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class FunnalPageItem1DTO
    {
        public int ID { get; set; }
        public string PageName { get; set; }
        public string Link { get; set; }
        public int Status { get; set; }
        public string StepList { get; set; }
        public string SoloIDList { get; set; }

        private FunnalPageItem1DTO()
        {
            ID = 0;
            Status = 0;
            PageName = string.Empty;
            Link = string.Empty;
            StepList = string.Empty;
            SoloIDList = string.Empty;
        }
    }
}
