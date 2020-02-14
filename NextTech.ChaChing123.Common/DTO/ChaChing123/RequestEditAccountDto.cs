using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class RequestEditAccountDTO
    {

        public string FullName { get; set; }

        public string UserName { get; set; }

        public string AvartaPath { get; set; }

        public string SessionKey { get; set; }

        public RequestEditAccountDTO()
        {
            this.FullName = string.Empty;
            this.AvartaPath = string.Empty;
            this.UserName = string.Empty;
            this.SessionKey = string.Empty;
        }
    }
}
