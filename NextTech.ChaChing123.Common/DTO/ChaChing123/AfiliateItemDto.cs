using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class AfiliateItemDTO
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string CreatedDate { get; set; }
        public int AccountType { get; set; }
        public string AccountTypeName { get; set; }
        public int StatusCode { get; set; }
        public string StatusName { get; set; }
        public string ContractNo { get; set; }
        public string AffiliateName { get; set; }

        private AfiliateItemDTO()
        {
            ID = 0;
            UserName = string.Empty;
            Phone= string.Empty;
            FullName = string.Empty;
            CreatedDate = string.Empty;
            AccountType = 0;
            StatusCode = 0;
            StatusName = string.Empty;
            ContractNo = string.Empty;
            AccountTypeName = string.Empty;
            AffiliateName = string.Empty;
        }
    }
}
