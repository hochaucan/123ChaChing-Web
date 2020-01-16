using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class RequestDTO
    {
        public string UserName { get; set; }

        public string SessionKey { get; set; }


        private RequestDTO()
        {
            UserName = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
