/// <summary>
/// <author>Ngô Tấn Phúc</author>
/// <description>Created date: </description>
/// <revision history>Version: 1.0.1</revision history>
/// </summary>

namespace NextTech.ChaChing123.Data.Configurations
{
    using Entities;
    public class AffiliateConfiguration : EntityBaseConfiguration<Affiliate>
    {
        public AffiliateConfiguration()
        {

            Property(r => r.ID).IsRequired();
            Property(r => r.UserReceiver).IsRequired().HasMaxLength(50);
            Property(r => r.UserSend).IsRequired().HasMaxLength(50);
            Property(r => r.Amount);
            Property(r => r.Status);
            Property(r => r.CashType);
            Property(r => r.ContractNo).IsRequired().HasMaxLength(50);
            Property(r => r.OrderType);
            Property(r => r.CreatedBy).IsRequired().HasMaxLength(50);
            Property(r => r.CreatedDate).IsRequired();
            Property(r => r.UpdatedBy).HasMaxLength(50);
            Property(r => r.UpdatedDate);
        }
    }
} 
