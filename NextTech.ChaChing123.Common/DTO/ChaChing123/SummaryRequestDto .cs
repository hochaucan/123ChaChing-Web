using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class SummaryRequestDTO
    {
        public string UserName { get; set; }

        public string SessionKey { get; set; }

        public string StartList { get; set; }

        public string EndList { get; set; }

        public string YearList { get; set; }

        public int FunnalID { get; set; }

        public int SoloID { get; set; }

        private SummaryRequestDTO()
        {
            UserName = string.Empty;
            SessionKey = string.Empty;
            StartList = string.Empty;
            EndList = string.Empty;
            YearList = string.Empty;
            SoloID = 0;
            FunnalID = 0;
        }
    }
}
