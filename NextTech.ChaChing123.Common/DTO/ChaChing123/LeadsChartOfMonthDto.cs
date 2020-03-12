using System;
using System.Collections.Generic;

namespace NextTech.ChaChing123.Common.Models
{
   public class LeadsChartOfMonthDTO
    {
        public List<LeadsOfMonthDTO> HotItems { get; set; }
        public List<LeadsOfMonthDTO> ColdItems { get; set; }
        public List<LeadsOfMonthDTO> WarmItems { get; set; }
        public List<LeadsOfMonthDTO> EnrolledItems { get; set; }


        public LeadsChartOfMonthDTO()
        {
            HotItems = new List<LeadsOfMonthDTO>();
            ColdItems = new List<LeadsOfMonthDTO>();
            WarmItems = new List<LeadsOfMonthDTO>();
            EnrolledItems = new List<LeadsOfMonthDTO>();
        }
    }
}
