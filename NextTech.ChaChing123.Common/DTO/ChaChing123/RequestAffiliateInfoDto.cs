using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class RequestAffiliateInfoDTO
    {
        public string UserName { get; set; }

        public string SessionKey { get; set; }

        public string FromDate { get; set; }

        public string ToDate { get; set; }

        private RequestAffiliateInfoDTO()
        {
            FromDate = string.Empty;
            UserName = string.Empty;
            SessionKey = string.Empty;
            ToDate = string.Empty;
        }
    }
}
