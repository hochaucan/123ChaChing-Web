using NextTech.ChaChing123.Entities.ChaChing123;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NextTech.ChaChing123.Data.Configurations.ChaChing123
{
    public class RequestWithdrawalInfoConfiguration : EntityBaseConfiguration<RequestWithdrawalInfo>
    {
        public RequestWithdrawalInfoConfiguration()
        {
            Property(r => r.ID).IsRequired();
            Property(r => r.ContractNo).IsRequired().HasMaxLength(50);
            Property(r => r.BeneAccountName).IsRequired().HasMaxLength(200);
            Property(r => r.BeneBankName).IsRequired().HasMaxLength(255);
            Property(r => r.BeneAccountNo).IsRequired().HasMaxLength(20);
            Property(r => r.CreatedBy).IsRequired().HasMaxLength(50);
            Property(r => r.CreatedDate).IsRequired();
            Property(r => r.UpdatedBy).HasMaxLength(50);
            Property(r => r.UpdatedDate);
        }
    }
}
