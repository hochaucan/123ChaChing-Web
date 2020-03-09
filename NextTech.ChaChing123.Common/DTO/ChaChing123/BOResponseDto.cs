using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class BOResponseDto
    {
        public string Title { get; set; }
        public string Content { get; set; }
        
        private BOResponseDto()
        {
            Title = string.Empty;
            Content = string.Empty;
        }
    }
}
