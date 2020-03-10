using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class BOAccountInfo2DTO
    {
        public string ContractNo { get; set; }
        public string CreatedDate { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        
        //public string Email { get; set; }
        public string Phone { get; set; }
        public int AccountTypeNo { get; set; }
        public string AccountTypeName { get; set; }

        public int PaymentStatusNo { get; set; }
        public string PaymentStatusName { get; set; }
        public int CashTypeNo { get; set; }
        public string CashTypeName { get; set; }

        public int RenewalNo { get; set; }
        public decimal Amount { get; set; }
        public int StatusNo { get; set; }
        public string StatusName { get; set; }


        private BOAccountInfo2DTO()
        {
            ContractNo = string.Empty;
            FullName = string.Empty;
            UserName = string.Empty;
            Phone = string.Empty;
            AccountTypeNo = 0;
            AccountTypeName = string.Empty;
            CashTypeNo = 0;
            CashTypeName = string.Empty;
            RenewalNo = 0;
            Amount = 0;
            StatusNo = 0;
            StatusName = string.Empty;
            CreatedDate = string.Empty;
            PaymentStatusNo = 0;
            PaymentStatusName = string.Empty;
        }
    }
}
