using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class AffiliateOfMonthDTO
    {
        public string Year { get; set; }

        public string Month { get; set; }

        public string Commission { get; set; }

        public string CommissionThanks { get; set; }                                                                  


        private AffiliateOfMonthDTO()
        {
            Year = string.Empty;
            Month = string.Empty;
            Commission = string.Empty;
            CommissionThanks = string.Empty;
        }
    }
}
