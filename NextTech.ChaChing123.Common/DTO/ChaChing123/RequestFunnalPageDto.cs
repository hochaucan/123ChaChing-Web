using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class RequestFunnalPageDTO
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string PageName { get; set; }
        public string Link { get; set; }
        public int Status { get; set; }
        public string StepList { get; set; }        
        public string SoloIDList { get; set; }
        public string UserName { get; set; }
        public string SessionKey { get; set; }


        private RequestFunnalPageDTO()
        {
            ID = 0;
            Title = string.Empty;
            SubTitle = string.Empty;
            PageName = string.Empty;
            Link = string.Empty;
            Status = 0;
            StepList = string.Empty;
            SoloIDList = string.Empty;
            UserName = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
