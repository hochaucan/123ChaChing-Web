namespace NextTech.ChaChing123.Data.Infrastructure
{
    public class DbFactory : Disposable, IDbFactory
    {
        ApplicationContext dbContext;

        public ApplicationContext Init()
        {
            return dbContext ?? (dbContext = new ApplicationContext());
        }

        protected override void DisposeCore()
        {
            if (dbContext != null)
                dbContext.Dispose();
        }
    }
}
