using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class AfiliateAlertDTO
    {
        public string Fullname { get; set; }

        public string Phone { get; set; }

        public DateTime RegisterDate { get; set; }


        private AfiliateAlertDTO()
        {
            Fullname = string.Empty;
            Phone = string.Empty;
            RegisterDate = DateTime.Now;
        }
    }
}
