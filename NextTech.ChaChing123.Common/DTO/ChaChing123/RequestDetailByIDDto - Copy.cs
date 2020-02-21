using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class RegisterLeadBySoloPageDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string SoloID { get; set; }

        private RegisterLeadBySoloPageDTO()
        {
            Name = string.Empty;
            Email = string.Empty;
            Phone = string.Empty;
            SoloID = string.Empty;
        }
    }
}
