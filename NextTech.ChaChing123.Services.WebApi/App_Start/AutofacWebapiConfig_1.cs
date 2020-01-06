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

using BTMU.OLS.Data;
using BTMU.OLS.Data.Infrastructure;
using BTMU.OLS.Data.Repositories;
using BTMU.OLS.Business;
using BTMU.OLS.Services.WebApi.Infrastructure.Core;

namespace BTMU.OLS.Services.WebApi.App_Start
{
    public class AutofacWebapiConfig
    {
        public static IContainer Container;
        public static void Initialize(HttpConfiguration config)
        {
            Initialize(config, RegisterServices(new ContainerBuilder()));
        }

        public static void Initialize(HttpConfiguration config, IContainer container)
        {
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }

        private static IContainer RegisterServices(ContainerBuilder builder)
        {
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            // BEGIN DO NOT REMOVE
            // EF HomeCinemaContext
            builder.RegisterType<ApplicationContext>()
                   .As<DbContext>()
                   .InstancePerRequest();

            builder.RegisterType<UsersComponent>()
            .As<IUsersService>()
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


            // Custom Interface for Applicaiton Service
            builder.RegisterType<ApplicationComponent>()
                .As<IApplicationService>()
                .InstancePerRequest();

            // Custom Interface for LookupCode Service
            builder.RegisterType<LookupCodeComponent>()
            .As<ILookupCodeService>()
            .InstancePerRequest();

            // Custom Interface for Resources Service
            builder.RegisterType<ResourcesComponent>()
            .As<IResourcesService>()
            .InstancePerRequest();

            builder.RegisterType<RolesComponent>()
            .As<IRolesService>()
            .InstancePerRequest();

            builder.RegisterType<UnitsComponent>()
            .As<IUnitsService>()
            .InstancePerRequest();

	    // End Remove the sample code below if not in used


            // End Custom Interface



            // Services - Add New Service here

            // Custom Interface
            builder.RegisterType<OffshoreLoanComponent>()
            .As<IOffshoreLoanService>()
            .InstancePerRequest();

            builder.RegisterType<OffshoreLoanVersionHistoryComponent>()
            .As<IOffshoreLoanVersionHistoryService>()
            .InstancePerRequest();

            builder.RegisterType<RepaymentComponent>()
            .As<IRepaymentService>()
            .InstancePerRequest();

            builder.RegisterType<RepaymentVersionHistoryComponent>()
            .As<IRepaymentVersionHistoryService>()
            .InstancePerRequest();

            builder.RegisterType<SBVInformationComponent>()
            .As<ISBVInformationService>()
            .InstancePerRequest();

            builder.RegisterType<SBVInformationVersionHistoryComponent>()
            .As<ISBVInformationVersionHistoryService>()
            .InstancePerRequest();

            builder.RegisterType<SysAuditComponent>()
            .As<ISysAuditService>()
            .InstancePerRequest();

            builder.RegisterType<SysCurrentDateComponent>()
            .As<ISysCurrentDateService>()
            .InstancePerRequest();

            builder.RegisterType<SysHolidayComponent>()
            .As<ISysHolidayService>()
            .InstancePerRequest();

            builder.RegisterType<SysLockControlComponent>()
            .As<ISysLockControlService>()
            .InstancePerRequest();

            builder.RegisterType<SysParameterComponent>()
            .As<ISysParameterService>()
            .InstancePerRequest();

            builder.RegisterType<SysPrefComponent>()
            .As<ISysPrefService>()
            .InstancePerRequest();

            builder.RegisterType<SysReportComponent>()
            .As<ISysReportService>()
            .InstancePerRequest();

            builder.RegisterType<SysReportParameterComponent>()
            .As<ISysReportParameterService>()
            .InstancePerRequest();

            builder.RegisterType<SysSequenceControlComponent>()
            .As<ISysSequenceControlService>()
            .InstancePerRequest();

            builder.RegisterType<SysWorkflowAuditComponent>()
            .As<ISysWorkflowAuditService>()
            .InstancePerRequest();

            builder.RegisterType<SysWorkflowTaskComponent>()
            .As<ISysWorkflowTaskService>()
            .InstancePerRequest();

            builder.RegisterType<VWAccountMasterComponent>()
            .As<IVWAccountMasterService>()
            .InstancePerRequest();

            builder.RegisterType<VWBookingIncomingRemittanceComponent>()
            .As<IVWBookingIncomingRemittanceService>()
            .InstancePerRequest();

            builder.RegisterType<VWCIFMasterComponent>()
            .As<IVWCIFMasterService>()
            .InstancePerRequest();



            // Sample Service
            /*

            builder.RegisterType<ApplicationComponent>()
                .As<IApplicationService>()
                .InstancePerRequest();

            builder.RegisterType<EncryptionService>()
                .As<IEncryptionService>()
                .InstancePerRequest();

            builder.RegisterType<MembershipService>()
                .As<IMembershipService>()
                .InstancePerRequest();
            */

            // Generic Data Repository Factory
            builder.RegisterType<DataRepositoryFactory>()
                .As<IDataRepositoryFactory>().InstancePerRequest();

            Container = builder.Build();

            return Container;
        }
    }
}