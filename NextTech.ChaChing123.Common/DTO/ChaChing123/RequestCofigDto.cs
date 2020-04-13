using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class RequestConfigDTO
    {
        public string Key { get; set; }

        public string Value { get; set; }

        public string SessionKey { get; set; }

        private RequestConfigDTO()
        {
            Key = string.Empty;
            Value = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
