using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class RequestViewDetaiDTO
    {
        public int ID { get; set; }

        public string UserName { get; set; }

        public string SessionKey { get; set; }


        private RequestViewDetaiDTO()
        {
            ID = 0;
            UserName = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
