

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
            var count = new SqlParameter("Count", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            BODataListDTO Items = new BODataListDTO();
            Items.Items = dbContext.Database.SqlQuery<SoloPageItem1DTO>("EXEC [dbo].[sp_GetAllSoloPage] @UserName,@SessionKey,@Count out,@errorCode out",
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        count,
                        errorCode).Skip((obj.PageIndex - 1) * obj.PageCount).Take(obj.PageCount).ToList<SoloPageItem1DTO>();

            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();
            if (result.StatusCode == 0)
            {
                Items.Total = int.Parse(count.Value.ToString(), 0);
                result.Details = Items;
            }
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
            
            result.Details = dbContext.Database.SqlQuery<ResponeDTO>("EXEC [dbo].[sp_AddSoloPage] @Title,@SubTitle,@ButtonName,@ButtonColor,@PageName,@RefLink,@Link,@BackgroundPath,@ResourcePath,@ShareCode,@UseShareCode,@ThankYouContent,@FromType,@IsAdvance,@Status,@AutoresponderCodes,@TrackingCode,@CreatedBy,@SessionKey,@errorCode out",
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
                        new SqlParameter("ThankYouContent", DB.SafeSQL(obj.ThankYouContent)),
                        new SqlParameter("FromType", obj.FromType),
                        new SqlParameter("IsAdvance", obj.IsAdvance),
                        new SqlParameter("Status", obj.Status),
                        new SqlParameter("AutoresponderCodes", obj.AutoresponderCodes),
                        new SqlParameter("TrackingCode", obj.TrackingCode),
                        new SqlParameter("CreatedBy", DB.SafeSQL(obj.CreatedBy)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode).FirstOrDefault<ResponeDTO>();
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();
            return result;
        }

        public static ResultDTO GetAllPublicSoloPage(this IEntityBaseRepository<LandingPage> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.SqlQuery<SoloPageItem2DTO>("EXEC [dbo].[sp_GetAllPublicSoloPage] @SessionKey,@errorCode out",
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode).ToList<SoloPageItem2DTO>();

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

            result.Details = dbContext.Database.SqlQuery<ResponeDTO>("EXEC [dbo].[sp_EditSoloPage] @ID, @Title,@SubTitle,@ButtonName,@ButtonColor,@PageName,@RefLink,@Link,@BackgroundPath,@ResourcePath,@ShareCode,@UseShareCode,@ThankYouContent,@FromType,@IsAdvance,@Status,@AutoresponderCodes,@TrackingCode,@UpdatedBy,@SessionKey,@errorCode out",
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
                        new SqlParameter("ThankYouContent", DB.SafeSQL(obj.ThankYouContent)),
                        new SqlParameter("FromType", obj.FromType),
                        new SqlParameter("IsAdvance", obj.IsAdvance),
                        new SqlParameter("Status", obj.Status),
                        new SqlParameter("AutoresponderCodes", DB.SafeSQL(obj.AutoresponderCodes) ),
                        new SqlParameter("TrackingCode", DB.SafeSQL(obj.TrackingCode) ),
                        new SqlParameter("UpdatedBy", DB.SafeSQL(obj.UpdatedBy)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                         errorCode).FirstOrDefault<ResponeDTO>();
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

            result.Details = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_DeleteSoloPage] @ID,@UserName,@SessionKey,@errorCode out",
                       new SqlParameter("ID", obj.ID),
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        #endregion

        #region [Funnal]
        public static ResultDTO GetDetailFunnalPage(this IEntityBaseRepository<LandingPage> repository, RequestViewDetaiDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            FunnalPageItem1DTO data=dbContext.Database.SqlQuery<FunnalPageItem1DTO>("EXEC [dbo].[sp_GetDetailFunnalPage] @ID,@UserName,@SessionKey,@errorCode out",
                      new SqlParameter("ID", obj.ID),
                      new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                      new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                      errorCode).FirstOrDefault<FunnalPageItem1DTO>();
            if(data!=null && !string.IsNullOrEmpty(data.StepList) && !string.IsNullOrEmpty(data.SoloIDList))
            {
                data.StepList = data.StepList.TrimEnd(',');
                data.SoloIDList = data.SoloIDList.TrimEnd(',');
            }

            result.Details = data;
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

            result.Details = dbContext.Database.SqlQuery<FunnalPageItemDTO>("EXEC [dbo].[sp_GetAllFunnalPage] @UserName,@SessionKey,@errorCode out",
                       new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                       new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                       errorCode).ToList<FunnalPageItemDTO>();

            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        public static ResultDTO AddFunnalPage(this IEntityBaseRepository<LandingPage> repository, RequestFunnalPageDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.SqlQuery<ResponeDTO>("EXEC [dbo].[sp_AddFunnalPage] @Title,@SubTitle,@PageName,@Link,@Status,@StepList,@SoloIDList,@UserName,@SessionKey,@errorCode out",
                        new SqlParameter("Title", DB.SafeSQL(obj.Title)),
                        new SqlParameter("SubTitle", DB.SafeSQL(obj.SubTitle)),
                        new SqlParameter("PageName", DB.SafeSQL(obj.PageName)),
                        new SqlParameter("Link", DB.SafeSQL(obj.Link)),
                        new SqlParameter("Status", obj.Status),
                        new SqlParameter("StepList", DB.SafeSQL(obj.StepList)),
                        new SqlParameter("SoloIDList", DB.SafeSQL(obj.SoloIDList)),
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode).FirstOrDefault<ResponeDTO>();
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();
            return result;
        }
        public static ResultDTO EditFunnalPage(this IEntityBaseRepository<LandingPage> repository, RequestFunnalPageDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.SqlQuery<ResponeDTO>("EXEC [dbo].[sp_EditFunnalPage] @ID,@Title,@SubTitle,@PageName,@Link,@Status,@StepList,@SoloIDList,@UserName,@SessionKey,@errorCode out",
                        new SqlParameter("ID", obj.ID),
                        new SqlParameter("Title", DB.SafeSQL(obj.Title)),
                        new SqlParameter("SubTitle", DB.SafeSQL(obj.SubTitle)),
                        new SqlParameter("PageName", DB.SafeSQL(obj.PageName)),
                        new SqlParameter("Link", DB.SafeSQL(obj.Link)),
                        new SqlParameter("Status", obj.Status),
                        new SqlParameter("StepList", DB.SafeSQL(obj.StepList)),
                        new SqlParameter("SoloIDList", DB.SafeSQL(obj.SoloIDList)),
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode).FirstOrDefault<ResponeDTO>();
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();
            return result;
        }
        public static ResultDTO DeleteFunnalPage(this IEntityBaseRepository<LandingPage> repository, RequestViewDetaiDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_DeleteFunnalPage] @ID,@UserName,@SessionKey,@errorCode out",
                        new SqlParameter("ID", obj.ID),
                        new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                        new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                        errorCode);
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
        #endregion
        public static ResultDTO GetSubTitleTemplate(this IEntityBaseRepository<LandingPage> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                result.Details = dbContext.Database.SqlQuery<TitleTemplateDTO>("EXEC [dbo].[sp_BO_GetAllSubTitleTemplate] @SessionKey, @errorCode out",
                           new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                           errorCode).ToList<TitleTemplateDTO>();

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        public static ResultDTO GetTitleTemplate(this IEntityBaseRepository<LandingPage> repository, RequestDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                result.Details = dbContext.Database.SqlQuery<TitleTemplateDTO>("EXEC [dbo].[sp_BO_GetAllTitleTemplate] @SessionKey, @errorCode out",
                           new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                           errorCode).ToList<TitleTemplateDTO>();

                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }

        
        public static ResultDTO GetFunnalDetailByReivew(this IEntityBaseRepository<LandingPage> repository, RequestNextSoloDTO obj)
        {
            var result = new ResultDTO();
            FunnalDetailDTO funnalDetail=new FunnalDetailDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var pageName = new SqlParameter("PageName", System.Data.SqlDbType.VarChar, 50)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var status = new SqlParameter("Status", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
             
            try
            {
                funnalDetail.ID = obj.FunnalID;
                funnalDetail.SoloObj = dbContext.Database.SqlQuery<NextSoloPageDTO>("EXEC [dbo].[sp_GetFunnalDetailByReivew] @FunnalID,@SoloID,@IsNext,@UserName,@SessionKey, @PageName out, @Status out, @ErrorCode out",
                           new SqlParameter("FunnalID", obj.FunnalID),
                           new SqlParameter("SoloID", obj.SoloID),
                           new SqlParameter("IsNext", obj.IsNext),
                           new SqlParameter("UserName", DB.SafeSQL(obj.UserName)),
                           new SqlParameter("SessionKey", DB.SafeSQL(obj.SessionKey)),
                           pageName,
                           status,
                           errorCode
                           ).FirstOrDefault<NextSoloPageDTO>();
                if (status != null && status.Value != null && !string.IsNullOrEmpty(status.Value.ToString()))
                {
                    funnalDetail.Status = int.Parse(status.Value.ToString(), 0);
                }
                if (pageName != null && pageName.Value != null && !string.IsNullOrEmpty(pageName.Value.ToString()))
                {
                    funnalDetail.PageName = pageName.Value.ToString();
                }
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                if (result.StatusCode == 0)
                {
                    result.Details = funnalDetail;
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
        #region FO

        public static ResultDTO GetFunnalDetailByPublic(this IEntityBaseRepository<LandingPage> repository, RequestNextSoloDTO obj)
        {
            var result = new ResultDTO();
            FunnalDetailDTO funnalDetail = new FunnalDetailDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var pageName = new SqlParameter("PageName", System.Data.SqlDbType.VarChar, 50)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            var status = new SqlParameter("Status", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            try
            {
                funnalDetail.ID = obj.FunnalID;
                funnalDetail.SoloObj = dbContext.Database.SqlQuery<NextSoloPageDTO>("EXEC [dbo].[sp_GetFunnalDetailByPublic] @FunnalID,@SoloID,@IsNext, @PageName out, @Status out, @ErrorCode out",
                           new SqlParameter("FunnalID", obj.FunnalID),
                           new SqlParameter("SoloID", obj.SoloID),
                           new SqlParameter("IsNext", obj.IsNext),
                           pageName,
                           status,
                           errorCode
                           ).FirstOrDefault<NextSoloPageDTO>();
                if (status != null && status.Value != null && !string.IsNullOrEmpty(status.Value.ToString()))
                {
                    funnalDetail.Status = int.Parse(status.Value.ToString(), 0);
                }
                if (pageName != null && pageName.Value != null && !string.IsNullOrEmpty(pageName.Value.ToString()))
                {
                    funnalDetail.PageName = pageName.Value.ToString();
                }
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.SetContentMsg();
                if (result.StatusCode == 0)
                {
                    result.Details = funnalDetail;
                }
                
            }
            catch (Exception ex)
            {
                result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
                result.Details = ex.Message;
            }

            return result;
        }
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

        public static ResultDTO GetDetailFunnalPageByID(this IEntityBaseRepository<LandingPage> repository, RequestDetailByIDDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            FunnalPageItem1DTO data = dbContext.Database.SqlQuery<FunnalPageItem1DTO>("EXEC [dbo].[sp_FO_GetDetailFunnalPageByID] @ID,@errorCode out",
                        new SqlParameter("ID", obj.ID),
                        errorCode).FirstOrDefault<FunnalPageItem1DTO>();
            if (data != null && !string.IsNullOrEmpty(data.StepList) && !string.IsNullOrEmpty(data.SoloIDList))
            {
                data.StepList = data.StepList.TrimEnd(',');
                data.SoloIDList = data.SoloIDList.TrimEnd(',');
            }
            result.Details = data;
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }

        public static ResultDTO RegisterLeadBySoloPage(this IEntityBaseRepository<LandingPage> repository, RegisterLeadBySoloPageDTO obj)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("ErrorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };
            result.Details = dbContext.Database.SqlQuery<MailChimpResponse1DTO>("EXEC [dbo].[sp_FO_RegisterLeadBySoloPage] @Name,@Email,@Phone,@FunnalID,@SoloID,@errorCode out",
                        new SqlParameter("Name", DB.SafeSQL(obj.Name)),
                        new SqlParameter("Email", DB.SafeSQL(obj.Email)),
                        new SqlParameter("Phone", DB.SafeSQL(obj.Phone)),
                        new SqlParameter("FunnalID", DB.SafeSQL(obj.FunnelID)),
                        new SqlParameter("SoloID", DB.SafeSQL(obj.SoloID)),
                        errorCode).FirstOrDefault<MailChimpResponse1DTO>();
            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }
       
        #endregion
    }


}
