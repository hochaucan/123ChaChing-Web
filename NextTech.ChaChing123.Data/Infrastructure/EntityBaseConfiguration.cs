namespace NextTech.ChaChing123.Data.Configurations
{
    using Entities;
    using System.Data.Entity.ModelConfiguration;

    public class EntityBaseConfiguration<T> : EntityTypeConfiguration<T> where T : class, IEntityBase
    {
        public EntityBaseConfiguration()
        {
            HasKey(e => e.ID);
        }
    }
}
