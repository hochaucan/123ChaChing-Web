using System;
using System.Collections.Generic;

namespace NextTech.ChaChing123.Common.Models
{
   public class BOCommissionReportObjDto
    {
        public decimal TotalAmount { get; set; }
        public decimal PendingAmount { get; set; }
        public decimal Amount { get; set; }
        public int Total { get; set; }
        public List<BOCommissionReportItemDto> Items { get; set; }        
        public BOCommissionReportObjDto()
        {
            TotalAmount = 0;
            PendingAmount = 0;
            Amount = 0;
            Total = 0;
        }
    }
}
