using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class BOResponseDto
    {
        public string Title { get; set; }
        public string Content { get; set; }

        public int Order { get; set; }
        
        private BOResponseDto()
        {
            Order = 0;
            Title = string.Empty;
            Content = string.Empty;
        }
    }
}
