using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class RequestSoloByShareCodeDTO
    {
        public string ShareCode { get; set; }

        public string SessionKey { get; set; }


        private RequestSoloByShareCodeDTO()
        {
            ShareCode = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
