

namespace NextTech.ChaChing123.Data.Extensions
{
    using NextTech.ChaChing123.Data.Repositories;
    using Entities;
    using System.Linq;
    using Core.Utilities.Security;
    using System;
    using System.Data.SqlClient;
    using NextTech.ChaChing123.Common.Models;
    using NextTech.ChaChing123.Core.Models;

    /// <summary>
    /// Class LandingPageExtensions.
    /// </summary>
    public static class LandingPageExtensions
    {
        public static ResultDTO GetSoloInfoByShareCode(this IEntityBaseRepository<LandingPage> repository, RequestSoloByShareCodeDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.SqlQuery<SoloPageByShareCodeDTO>("EXEC [dbo].[sp_GetSoloInfoByShareCode] @ShareCode, @SessionKey, @errorCode out",
                new SqlParameter("ShareCode", obj.ShareCode),
                new SqlParameter("SessionKey", obj.SessionKey),
                errorCode).FirstOrDefault<SoloPageByShareCodeDTO>();
            
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }

        #region [SoloPage]
        public static ResultDTO GetDetailSoloPage(this IEntityBaseRepository<LandingPage> repository, RequestViewDetaiDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.SqlQuery<SoloPageItemDTO>("EXEC [dbo].[sp_GetDetailSoloPage] @ID,@UserName,@SessionKey,@errorCode out",
                        new SqlParameter("ID", obj.ID),
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode).FirstOrDefault<SoloPageItemDTO>();

            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }

        public static ResultDTO GetAllSoloPage(this IEntityBaseRepository<LandingPage> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.SqlQuery<SoloPageItem1DTO>("EXEC [dbo].[sp_GetAllSoloPage] @UserName,@SessionKey,@errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode).ToList<SoloPageItem1DTO>();

            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        public static ResultDTO AddSoloPage(this IEntityBaseRepository<LandingPage> repository, SolaPageDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            
            result.Details = dbContext.Database.SqlQuery<RequestDetailByIDDTO>("EXEC [dbo].[sp_AddSoloPage] @Title,@SubTitle,@ButtonName,@ButtonColor,@PageName,@RefLink,@Link,@BackgroundPath,@ResourcePath,@ShareCode,@UseShareCode,@FromType,@IsAdvance,@Status,@AutoresponderCodes,@TrackingCode,@CreatedBy,@SessionKey,@errorCode out",
                        new SqlParameter("Title", DB.SafeSQL(obj.Title)),
                        new SqlParameter("SubTitle", DB.SafeSQL(obj.SubTitle)),
                        new SqlParameter("ButtonName", DB.SafeSQL(obj.ButtonName)),
                        new SqlParameter("ButtonColor", DB.SafeSQL(obj.ButtonColor)),
                        new SqlParameter("PageName", DB.SafeSQL(obj.PageName)),
                        new SqlParameter("RefLink", DB.SafeSQL(obj.RefLink)),
                        new SqlParameter("Link", DB.SafeSQL(obj.Link)),
                        new SqlParameter("BackgroundPath", DB.SafeSQL(obj.BackgroundPath)),
                        new SqlParameter("ResourcePath", DB.SafeSQL(obj.ResourcePath)),
                        new SqlParameter("ShareCode", DB.SafeSQL(obj.ShareCode)),
                        new SqlParameter("UseShareCode", DB.SafeSQL(obj.UseShareCode)),
                        new SqlParameter("FromType", obj.FromType),
                        new SqlParameter("IsAdvance", obj.IsAdvance),
                        new SqlParameter("Status", obj.Status),
                        new SqlParameter("AutoresponderCodes", obj.AutoresponderCodes),
                        new SqlParameter("TrackingCode", obj.TrackingCode),
                        new SqlParameter("CreatedBy", DB.SafeSQL(obj.CreatedBy)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode).FirstOrDefault<RequestDetailByIDDTO>();
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();
            return result;
        }
        //
        public static ResultDTO EditSoloPage(this IEntityBaseRepository<LandingPage> repository, SolaPageDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.SqlQuery<RequestDetailByIDDTO>("EXEC [dbo].[sp_EditSoloPage] @ID, @Title,@SubTitle,@ButtonName,@ButtonColor,@PageName,@RefLink,@Link,@BackgroundPath,@ResourcePath,@ShareCode,@UseShareCode,@FromType,@IsAdvance,@Status,@AutoresponderCodes,@TrackingCode,@UpdatedBy,@SessionKey,@errorCode out",
                        new SqlParameter("ID", obj.ID),
                        new SqlParameter("Title", DB.SafeSQL(obj.Title)),
                        new SqlParameter("SubTitle", DB.SafeSQL(obj.SubTitle)),
                        new SqlParameter("ButtonName", DB.SafeSQL(obj.ButtonName)),
                        new SqlParameter("ButtonColor", DB.SafeSQL(obj.ButtonColor)),
                        new SqlParameter("PageName", DB.SafeSQL(obj.PageName)),
                        new SqlParameter("RefLink", DB.SafeSQL(obj.RefLink)),
                        new SqlParameter("Link", DB.SafeSQL(obj.Link)),
                        new SqlParameter("BackgroundPath", DB.SafeSQL(obj.BackgroundPath)),
                        new SqlParameter("ResourcePath", DB.SafeSQL(obj.ResourcePath)),
                        new SqlParameter("ShareCode", DB.SafeSQL(obj.ShareCode)),
                        new SqlParameter("UseShareCode", DB.SafeSQL(obj.UseShareCode)),
                        new SqlParameter("FromType", obj.FromType),
                        new SqlParameter("IsAdvance", obj.IsAdvance),
                        new SqlParameter("Status", obj.Status),
                        new SqlParameter("AutoresponderCodes", DB.SafeSQL(obj.AutoresponderCodes) ),
                        new SqlParameter("TrackingCode", DB.SafeSQL(obj.TrackingCode) ),
                        new SqlParameter("UpdatedBy", DB.SafeSQL(obj.UpdatedBy)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                         errorCode).FirstOrDefault<RequestDetailByIDDTO>();
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        public static ResultDTO DeleteSoloPage(this IEntityBaseRepository<LandingPage> repository, RequestViewDetaiDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_DeleteSoloPage] @ID,@SessionKey,@errorCode out",
                        new SqlParameter("ID", obj.ID),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        #endregion

        #region [Funnal]
        public static ResultDTO GetDetailFunnalPage(this IEntityBaseRepository<LandingPage> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_GetDetailFunnalPage] @UserName,@SessionKey,@errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        public static ResultDTO GetAllFunnalPage(this IEntityBaseRepository<LandingPage> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_GetAllFunnalPage] @UserName,@SessionKey,@errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        public static ResultDTO AddFunnalPage(this IEntityBaseRepository<LandingPage> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_AddFunnalPage] @UserName,@SessionKey,@errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        public static ResultDTO EditFunnalPage(this IEntityBaseRepository<LandingPage> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_EditFunnalPage] @UserName,@SessionKey,@errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        public static ResultDTO DeleteFunnalPage(this IEntityBaseRepository<LandingPage> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_DeleteFunnalPage] @UserName,@SessionKey,@errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        #endregion

        public static ResultDTO GetTitleTemplate(this IEntityBaseRepository<LandingPage> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_GetTitleTemplate] @UserName,@SessionKey,@errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        public static ResultDTO GetSubTitleTemplate(this IEntityBaseRepository<LandingPage> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_GetSubTitleTemplate] @UserName,@SessionKey,@errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }

        #region FO
        public static ResultDTO GetDetailSoloPageByID(this IEntityBaseRepository<LandingPage> repository, RequestDetailByIDDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.SqlQuery<SoloPageItemDTO>("EXEC [dbo].[sp_FO_GetDetailSoloPageByID] @ID,@errorCode out",
                        new SqlParameter("ID", obj.ID),
                        errorCode).FirstOrDefault<SoloPageItemDTO>();
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        #endregion
    }


}
