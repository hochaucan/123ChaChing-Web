using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class BOAccountItem2DTO
    {
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int RenewalNo { get; set; }
        public string Note { get; set; }
        public string SessionKey { get; set; }

        private BOAccountItem2DTO()
        {
            FullName = string.Empty;
            UserName = string.Empty;
            Email = string.Empty;
            Phone = string.Empty;
            RenewalNo = 0;
            Note = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
