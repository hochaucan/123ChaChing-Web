using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class SoloPageByShareCodeDTO
    {
        
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string ButtonName { get; set; }
        public string ButtonColor { get; set; }
        public string PageName { get; set; }
        public string BackgroundPath { get; set; }
        

        private SoloPageByShareCodeDTO()
        {
            Title = string.Empty;
            SubTitle = string.Empty;
            ButtonName = string.Empty;
            ButtonColor = string.Empty;
            PageName = string.Empty;
            BackgroundPath = string.Empty;
        }
    }
}
