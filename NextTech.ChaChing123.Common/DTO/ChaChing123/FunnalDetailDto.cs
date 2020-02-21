using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class FunnalDetailDTO
    {
        public int ID { get; set; }
        public string PageName { get; set; }
        public int Status { get; set; }
        public NextSoloPageDTO SoloObj { get; set; }

        public FunnalDetailDTO()
        {
            ID = -1;
            Status = -1;
            PageName = string.Empty;
            SoloObj = new NextSoloPageDTO();
        }
    }
}
