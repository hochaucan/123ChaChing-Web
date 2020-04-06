using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class RequestContactInfoDTO
    {
        public string Name { get; set; }

        public string Email { get; set; }
        public string Phone { get; set; }

        public string Content { get; set; }

        private RequestContactInfoDTO()
        {
            Name = string.Empty;
            Email = string.Empty;
            Phone = string.Empty;
            Content = string.Empty;
        }
    }
}
