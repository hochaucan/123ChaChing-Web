using System;

namespace NextTech.ChaChing123.Common.Models
{
    public class GetResponseConfigRequestDTO
    {
        public int ID { get; set; }
        public string APIKey { get; set; }
        public string CampaignName { get; set; }
        public string SessionKey { get; set; }
        private GetResponseConfigRequestDTO()
        {
            ID = 0;
            APIKey = string.Empty;
            CampaignName = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
