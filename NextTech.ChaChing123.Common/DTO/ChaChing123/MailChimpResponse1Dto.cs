using System;

namespace NextTech.ChaChing123.Common.Models
{
    public class MailChimpResponse1DTO
    {
        public string PageName { get; set; }
        public string DataCenter { get; set; }
        public string APIKey { get; set; }
        public string ListID { get; set; }

        private MailChimpResponse1DTO()
        {
            PageName = string.Empty;
            DataCenter = string.Empty;
            APIKey = string.Empty;
            ListID = string.Empty;
        
        }
    }
}
