namespace NextTech.ChaChing123.Data.Infrastructure
{
    public interface IUnitOfWork
    {
        void BeginTran();
        void EndTran();
        void Commit();
      
    }
}
