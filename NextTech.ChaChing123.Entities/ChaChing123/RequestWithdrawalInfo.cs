using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NextTech.ChaChing123.Entities.ChaChing123
{
    public class RequestWithdrawalInfo : IEntityBase
    {
        public int ID { get; set; }
        public string ContractNo { get; set; }
        public string BeneAccountName { get; set; }
        public string BeneBankName { get; set; }
        public string BeneAccountNo { get; set; }
        public decimal Amount { get; set; }
        public string Remarks { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
