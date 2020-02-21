using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class RequestUpdateAvatarDTO
    {
        
        public string SessionKey { get; set; }

        public string AvatarFileName { get; set; }

        public RequestUpdateAvatarDTO()
        {
            AvatarFileName = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
