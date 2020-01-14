using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NextTech.ChaChing123.Services.WebApi.Models
{
    public class WithdrawalModel
    {
        public string ContractNo { get; set; }
        public string BeneAccountName { get; set; }
        public string BeneBankName { get; set; }
        public string BeneAccountNo { get; set; }
        public string Remarks { get; set; }
    }
}