using System;
using System.Collections.Generic;

namespace NextTech.ChaChing123.Common.Models
{
   public class BORevenueObjDto
    {
        public decimal TotalAmount { get; set; }
        public decimal PendingAmount { get; set; }
        public decimal ApprovedAmount { get; set; }
        public int Total { get; set; }
        public List<BORevenueItemDto> Items { get; set; }        
        public BORevenueObjDto()
        {
            TotalAmount = 0;
            PendingAmount = 0;
            ApprovedAmount = 0;
            Total = 0;
        }
    }
}
