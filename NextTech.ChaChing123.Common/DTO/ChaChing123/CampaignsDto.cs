using System;
using System.Collections.Generic;

namespace NextTech.ChaChing123.Common.Models
{
    public class CampaignsDTO
    {
        public string campaignId { get; set; }
        public string href { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string languageCode { get; set; }
        public string isDefault { get; set; }
        public DateTime createdOn { get; set; }
    }

    public class Campaign
    {
        public string campaignId { get; set; }
    }

    public class CustomFieldValue
    {
        public string customFieldId { get; set; }
        public List<object> value { get; set; }
    }

    public class ContactOfGetResponse
    {
        public string name { get; set; }
        public Campaign campaign { get; set; }
        public string email { get; set; }
        public string dayOfCycle { get; set; }
       // public int scoring { get; set; }
        //public string ipAddress { get; set; }
       // public List<Tag> tags { get; set; }
       // public List<CustomFieldValue> customFieldValues { get; set; }
    }
    
}
