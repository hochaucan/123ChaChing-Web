using Autofac;
using Autofac.Core;
using Autofac.Integration.WebApi;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Web;
using System.Web.Http;

using NextTech.ChaChing123.Data;
using NextTech.ChaChing123.Data.Repositories;
using NextTech.ChaChing123.Business;
using NextTech.ChaChing123.Services.WebApi.Infrastructure.Core;
using NextTech.ChaChing123.Data.Infrastructure;

namespace NextTech.ChaChing123.Services.WebApi.App_Start
{
    /// <summary>
    /// Class AutofacWebapiConfig.
    /// </summary>
    public class AutofacWebapiConfig
    {
        /// <summary>
        /// The container
        /// </summary>
        public static IContainer Container;
        /// <summary>
        /// Initializes the specified configuration.
        /// </summary>
        /// <param name="config">The configuration.</param>
        public static void Initialize(HttpConfiguration config)
        {
            Initialize(config, RegisterServices(new ContainerBuilder()));
        }

        /// <summary>
        /// Initializes the specified configuration.
        /// </summary>
        /// <param name="config">The configuration.</param>
        /// <param name="container">The container.</param>
        public static void Initialize(HttpConfiguration config, IContainer container)
        {
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }

        /// <summary>
        /// Registers the services.
        /// </summary>
        /// <param name="builder">The builder.</param>
        /// <returns>IContainer.</returns>
        private static IContainer RegisterServices(ContainerBuilder builder)
        {
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            // BEGIN DO NOT REMOVE
            // EF HomeCinemaContext
            builder.RegisterType<ApplicationContext>()
                   .As<DbContext>()
                   .InstancePerRequest();
	    
            // Begin Remove the sample code below if not in used

            builder.RegisterType<DbFactory>()
                .As<IDbFactory>()
                .InstancePerRequest();

            builder.RegisterType<UnitOfWork>()
                .As<IUnitOfWork>()
                .InstancePerRequest();

            builder.RegisterGeneric(typeof(EntityBaseRepository<>))
                   .As(typeof(IEntityBaseRepository<>))
                   .InstancePerRequest();
            // END DO NOT REMOVE


            // Services - Add New Service here

            

            // Generic Data Repository Factory
            builder.RegisterType<DataRepositoryFactory>()
                .As<IDataRepositoryFactory>().InstancePerRequest();

            // ChaChingTest
            builder.RegisterType <AccountComponent> ().As <IAccountService> ().InstancePerRequest();
         

            Container = builder.Build();

            return Container;
        }
    }
}