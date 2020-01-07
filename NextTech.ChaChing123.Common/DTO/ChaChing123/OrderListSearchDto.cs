using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class OrderListSearchDto
    {
        public string SessionKey { get; set; }

        public string KeyWord { get; set; }

        public int PaymentState { get; set; }

        public int AffiliateState { get; set; }

        public string AffiliateAccount { get; set; }

        public int PageIndex { get; set; }

        public int PageCount { get; set; }

        public int Total { get; set; }

        private OrderListSearchDto()
        {
            
        }
    }
}
