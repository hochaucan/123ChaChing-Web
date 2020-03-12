using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class BOWithDrawallInfoDTO
    {
        public string ContractNo { get; set; }
        public string CreatedDate { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }

        public string BeneAccountName { get; set; }
        public string BeneBankName { get; set; }
        public string BeneAccountNo { get; set; }
        public decimal Amount { get; set; }
        public string Remarks { get; set; }
        public int Status { get; set; }
        public string StatusName { get; set; }
        private BOWithDrawallInfoDTO()
        {
            ContractNo = string.Empty;
            FullName = string.Empty;
            UserName = string.Empty;             
            CreatedDate = string.Empty;
            BeneAccountName = string.Empty;
            BeneBankName = string.Empty;
            BeneAccountNo = string.Empty;
            Amount = 0;
            Remarks = string.Empty;
            StatusName = string.Empty;
            Status = -1;
        }
    }
}
