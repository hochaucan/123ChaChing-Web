using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class LeadsItemDTO
    {
        public int ID { get; set; }

        public string CreatedDate { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }
        public string Phone { get; set; }

        public int LeadType { get; set; }

        public string AffialateName { get; set; }
        public int Status { get; set; }
        private LeadsItemDTO()
        {
            ID = -1;
            CreatedDate = string.Empty;
            Name = string.Empty;
            Email = string.Empty;
            Phone = string.Empty;
            LeadType = -1;
            AffialateName = string.Empty;
            Status = -1;
        }
    }
}
