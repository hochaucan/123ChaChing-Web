using System;

namespace NextTech.ChaChing123.Common.Models
{
    public class MailChimpResponseDTO
    {
        public string DataCenter { get; set; }
        public string APIKey { get; set; }
        public string ListID { get; set; }

        private MailChimpResponseDTO()
        {
            DataCenter = string.Empty;
            APIKey = string.Empty;
            ListID = string.Empty;
        
        }
    }
}
