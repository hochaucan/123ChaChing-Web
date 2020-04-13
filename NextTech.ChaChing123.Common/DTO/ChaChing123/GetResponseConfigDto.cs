using System;

namespace NextTech.ChaChing123.Common.Models
{
    public class GetResponseConfigDTO
    {
        public int ID { get; set; }
        public string APIKey { get; set; }
        public string CampaignName { get; set; }
        private GetResponseConfigDTO()
        {
            ID = 0;
            APIKey = string.Empty;
            CampaignName = string.Empty;
        }
    }
}
