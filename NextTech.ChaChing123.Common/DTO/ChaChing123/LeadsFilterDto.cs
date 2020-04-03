using System;

namespace NextTech.ChaChing123.Common.Models
{
    public class LeadsFilterModel
    {
        public string LeadType { get; set; }

        public string KeyWord { get; set; }

        public string LeadStatus { get; set; }

        public string AffiliateAccount { get; set; }

        public string SessionKey { get; set; }

        public int PageIndex { get; set; }

        public int PageCount { get; set; }

        private LeadsFilterModel()
        {
            SessionKey = string.Empty;
            KeyWord = string.Empty;
            LeadStatus = "0,1,2";
            LeadType = "0,1,2,3";
            AffiliateAccount = string.Empty;
            PageIndex = 1;
            PageCount = 10;
        }
    }
}
