using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class BOAccountItem1DTO
    {
        public int ID { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }

        private BOAccountItem1DTO()
        {
            ID = 0;
            FullName = string.Empty;
            UserName = string.Empty;
        }
    }
}
