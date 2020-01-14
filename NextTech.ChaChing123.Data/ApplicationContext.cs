using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using NextTech.ChaChing123.Data.Configurations;
using NextTech.ChaChing123.Entities;
using NextTech.ChaChing123.Entities.ChaChing123;
using NextTech.ChaChing123.Data.Configurations.ChaChing123;

namespace NextTech.ChaChing123.Data
{
    /// <summary>
    /// Class ApplicationContext.
    /// </summary>
    /// <seealso cref="System.Data.Entity.DbContext" />
    public class ApplicationContext : DbContext
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ApplicationContext"/> class.
        /// </summary>
        public ApplicationContext()
            : base("AppConnectionString") // connection string of entity framework
        {
            Database.SetInitializer<ApplicationContext>(null);
        }

         #region Entity Sets
        //public IDbSet<Error> ErrorSet { get; set; }

     
        public IDbSet<Account> AccountSet { get; set; }
        /// <summary>
        /// Gets or sets the wallet set.
        /// </summary>
        /// <value>The wallet set.</value>

        public IDbSet<RequestWithdrawalInfo> RequestWithdrawalInfoSet { get; set; }
        /// <summary>
        /// Gets or sets the wallet set.
        /// </summary>
        /// <value>The wallet set.</value>

        #endregion

        /// <summary>
        /// The tran
        /// </summary>
        public DbContextTransaction _tran;

        /// <summary>
        /// Begins the tran.
        /// </summary>
        public void BeginTran()
        {
            _tran = base.Database.BeginTransaction();
        }


        /// <summary>
        /// Ends the tran.
        /// </summary>
        public void EndTran()
        {
            _tran.Commit();
        }

        /// <summary>
        /// Commits this instance.
        /// </summary>
        public virtual void Commit()
        {
            base.SaveChanges();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Configurations.Add(new AccountConfiguration());
            modelBuilder.Configurations.Add(new AffiliateConfiguration());
            modelBuilder.Configurations.Add(new RequestWithdrawalInfoConfiguration());
        }
    }
}
