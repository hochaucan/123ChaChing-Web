using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class RequestUpdateDTO
    {
        
        public string SessionKey { get; set; }

        public string FileName { get; set; }

        public RequestUpdateDTO()
        {
            FileName = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
