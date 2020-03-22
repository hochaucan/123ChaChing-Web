using System;

namespace NextTech.ChaChing123.Common.Models
{
    public class MailChimpRequestDTO
    {
        public string DataCenter { get; set; }
        public string APIKey { get; set; }
        public string ListID { get; set; }
        public string SessionKey { get; set; }

        private MailChimpRequestDTO()
        {
            DataCenter = string.Empty;
            APIKey = string.Empty;
            ListID = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
