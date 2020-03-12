using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class RegisterLeadBySoloPageDTO
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string SoloID { get; set; }
        public string FunnalID { get; set; }
        public string Notes { get; set; }
        public int LeadsType { get; set; }
        public string SessionKey { get; set; }
        
        private RegisterLeadBySoloPageDTO()
        {
            ID = 0;
            LeadsType = 0;
            Name = string.Empty;
            Email = string.Empty;
            Phone = string.Empty;
            SoloID = "0";
            FunnalID = "0";            
            Notes = string.Empty;
            SessionKey = string.Empty;
        }
    }
}
