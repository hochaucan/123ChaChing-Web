namespace NextTech.ChaChing123.Data.Configurations
{
    using Entities;


    /// <summary>
    /// Class AccountConfiguration.
    /// </summary>
    /// <seealso cref="NextTech.ChaChing123.Data.Configurations.EntityBaseConfiguration{NextTech.ChaChing123.Entities.Account}" />
    /// <seealso cref="BTMU.APF.Utilities.Data.Configurations.EntityBaseConfiguration{NextTech.ChaChing123.Entities.Account}" />
    public class AccountConfiguration : EntityBaseConfiguration<Account>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AccountConfiguration" /> class.
        /// </summary>
        public AccountConfiguration()
        {
            Property(r => r.ID).IsRequired();
            Property(r => r.FullName).HasMaxLength(256);
            Property(r => r.UserName).IsRequired().HasMaxLength(50);
            Property(r => r.Email).HasMaxLength(50);
            Property(r => r.Phone).HasMaxLength(15);
            Property(r => r.Password).IsRequired().HasMaxLength(50);
            Property(r => r.AccountType);
            Property(r => r.RefCode).HasMaxLength(20);
            Property(r => r.ParentCode).HasMaxLength(20);
            Property(r => r.Status);
            Property(r => r.IsLock);
            Property(r => r.IsLockAffilate);
            Property(r => r.ContractNo).IsRequired().HasMaxLength(50);
            Property(r => r.RenewalNo);
            Property(r => r.TrailDate).HasMaxLength(8);
            Property(r => r.MADA).HasMaxLength(8);
            Property(r => r.SubDomain).HasMaxLength(20);
            Property(r => r.CreatedBy).IsRequired().HasMaxLength(50);
            Property(r => r.CreatedDate).IsRequired();
            Property(r => r.UpdatedBy).HasMaxLength(50);
            Property(r => r.UpdatedDate);
        }
       
    }
}
