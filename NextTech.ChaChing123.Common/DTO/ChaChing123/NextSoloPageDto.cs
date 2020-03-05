using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class NextSoloPageDTO
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string ButtonName { get; set; }
        public string ButtonColor { get; set; }
        public string PageName { get; set; }
        public string RefLink { get; set; }
        public string BackgroundPath { get; set; }
        public string ResourcePath { get; set; }
        public string ThankYouContent { get; set; }
        public int FromType { get; set; }
        public int IsAdvance { get; set; }
        public int Status { get; set; }
        public string AutoresponderCodes { get; set; }        
        public string TrackingCode { get; set; }

        public string NextSoloID { get; set; }
        public NextSoloPageDTO()
        {
            ID = 0;
            Title = string.Empty;
            SubTitle = string.Empty;
            ButtonName = string.Empty;
            ButtonColor = string.Empty;
            PageName = string.Empty;
            RefLink = string.Empty;
            BackgroundPath = string.Empty;
            ResourcePath = string.Empty;
            FromType = 0;
            IsAdvance = 0;
            Status = 0;
            ThankYouContent = string.Empty;
            NextSoloID = string.Empty;
        }
    }
}
