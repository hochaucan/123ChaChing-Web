using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class BOAccountInfo2DTO
    {
        public string ContractNo { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        
        public string Email { get; set; }
        public string Phone { get; set; }
        public string AccountTypeNo { get; set; }
        public string AccountTypeName { get; set; }
        public string CashTypeNo { get; set; }
        public string CashTypeName { get; set; }

        public string RenewalNo { get; set; }
        public string Amount { get; set; }
        public string StatusNo { get; set; }
        public string StatusName { get; set; }


        private BOAccountInfo2DTO()
        {
            ContractNo = string.Empty;
            FullName = string.Empty;
            UserName = string.Empty;
            Email = string.Empty;
            Phone = string.Empty;
            AccountTypeNo = string.Empty;
            AccountTypeName = string.Empty;
            CashTypeNo = string.Empty;
            CashTypeName = string.Empty;
            RenewalNo = string.Empty;
            Amount = string.Empty;
            StatusNo = string.Empty;
            StatusName = string.Empty;
            CreatedDate = DateTime.Now;
        }
    }
}
