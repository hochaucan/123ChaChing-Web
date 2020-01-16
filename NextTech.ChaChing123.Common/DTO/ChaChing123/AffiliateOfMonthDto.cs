using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class AffiliateOfMonthDTO
    {
        public int Month { get; set; }

        //public string StartDate { get; set; }

        //public string EndDate { get; set; }

        public decimal Commission { get; set; }

        public decimal CommissionThanks { get; set; }                                                                  


        private AffiliateOfMonthDTO()
        {
            Month = -1;
            //StartDate = string.Empty;
            //EndDate = string.Empty;
        }
    }
}
