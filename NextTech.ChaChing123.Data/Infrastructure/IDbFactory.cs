namespace NextTech.ChaChing123.Data.Infrastructure
{
    using System;

    public interface IDbFactory : IDisposable
    {
        ApplicationContext Init();
    }
}
