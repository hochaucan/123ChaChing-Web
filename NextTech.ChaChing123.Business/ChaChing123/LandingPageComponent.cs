
using NextTech.ChaChing123.Common.Models;
using NextTech.ChaChing123.Common.Utilities;
using NextTech.ChaChing123.Core.Models;
using NextTech.ChaChing123.Data.Infrastructure;
using NextTech.ChaChing123.Data.Repositories;

namespace NextTech.ChaChing123.Business
{
    using System;
    using System.Linq;
    using NextTech.ChaChing123.Entities;
    using Common.Constants;
    using Data.Extensions;

    /// <summary>
    /// Class LandingPageComponent.
    /// </summary>
    /// <seealso cref="NextTech.ChaChing123.Business.ILandingPageService" />
    public class LandingPageComponent : ILandingPageService
    {
        #region Variables
        /// <summary>
        /// The repository
        /// </summary>
        private readonly IEntityBaseRepository<LandingPage> _repository;
        /// <summary>
        /// The unit of work
        /// </summary>
        private readonly IUnitOfWork _unitOfWork;
        #endregion

        /// <summary>
        /// Initializes a new instance of the <see cref="LandingPageComponent"/> class.
        /// </summary>
        /// <param name="repository">The repository.</param>
        /// <param name="unitOfWork">The unit of work.</param>
        public LandingPageComponent(IEntityBaseRepository<LandingPage> repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        #region ILandingPageService Implementation
      
        public ResultDTO GetSoloInfoByShareCode(RequestSoloByShareCodeDTO obj)
        {
            ResultDTO accInfo = null;
            
            try
            {
                accInfo = _repository.GetSoloInfoByShareCode(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetSoloInfoByShareCode", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                accInfo.StatusMsg= ex.Message.ToString();
            }

            return accInfo;
        }

        public ResultDTO GetDetailSoloPage(RequestViewDetaiDTO obj)
        {
            ResultDTO accInfo = null;
            try
            {
                accInfo = _repository.GetDetailSoloPage(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetDetailSoloPage", ActionType.Login, ex.Message.ToString(), obj.SessionKey);
                accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                accInfo.StatusMsg = ex.Message.ToString();
            }
            return accInfo;
        }
        public ResultDTO GetAllSoloPage(RequestDTO obj)
        {
            ResultDTO accInfo = null;
            try
            {
                accInfo = _repository.GetAllSoloPage(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllSoloPage", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                accInfo.StatusMsg = ex.Message.ToString();
            }
            return accInfo;
        }
        public ResultDTO AddSoloPage(SolaPageDTO obj)
        {
            ResultDTO accInfo = null;
            try
            {
               if(obj.Status != 1&& obj.Status != 2)
                {
                     accInfo = new ResultDTO();
                    accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS0029);
                    accInfo.SetContentMsg();
                }
                else
                {
                    obj.ShareCode = PasswordGenerator.generatePassword(8, false, true, false);
                    accInfo = _repository.AddSoloPage(obj);
                }
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("AddSoloPage", ActionType.Add, ex.Message.ToString(), obj.SessionKey);
                accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                accInfo.StatusMsg = ex.Message.ToString();
            }
            return accInfo;
        }
        public ResultDTO EditSoloPage(SolaPageDTO obj)
        {
            ResultDTO accInfo = null;
            try
            {
                accInfo = _repository.EditSoloPage(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("EditSoloPage", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                accInfo.StatusMsg = ex.Message.ToString();
            }
            return accInfo;
        }
        public ResultDTO DeleteSoloPage(RequestViewDetaiDTO obj)
        {
            ResultDTO accInfo = null;
            try
            {
                accInfo = _repository.DeleteSoloPage(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("DeleteSoloPage", ActionType.Delete, ex.Message.ToString(), obj.SessionKey);
                accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                accInfo.StatusMsg = ex.Message.ToString();
            }
            return accInfo;
        }
        public ResultDTO GetDetailFunnalPage(RequestViewDetaiDTO obj)
        {
            ResultDTO accInfo = null;
            try
            {
                accInfo = _repository.GetDetailFunnalPage(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetDetailFunnalPage", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                accInfo.StatusMsg = ex.Message.ToString();
            }
            return accInfo;
        }
        public ResultDTO GetAllFunnalPage(RequestDTO obj)
        {
            ResultDTO accInfo = null;
            try
            {
                accInfo = _repository.GetAllFunnalPage(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetAllFunnalPage", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                accInfo.StatusMsg = ex.Message.ToString();
            }
            return accInfo;
        }
        public ResultDTO AddFunnalPage(RequestFunnalPageDTO obj)
        {
            ResultDTO accInfo = null;
            try
            {
                accInfo = _repository.AddFunnalPage(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("AddFunnalPage", ActionType.Add, ex.Message.ToString(), obj.SessionKey);
                accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                accInfo.StatusMsg = ex.Message.ToString();
            }
            return accInfo;
        }
        public ResultDTO EditFunnalPage(RequestFunnalPageDTO obj)
        {
            ResultDTO accInfo = null;
            try
            {
                accInfo = _repository.EditFunnalPage(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("EditFunnalPage", ActionType.Update, ex.Message.ToString(), obj.SessionKey);
                accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                accInfo.StatusMsg = ex.Message.ToString();
            }
            return accInfo;
        }
        public ResultDTO DeleteFunnalPage(RequestViewDetaiDTO obj)
        {
            ResultDTO accInfo = null;
            try
            {
                accInfo = _repository.DeleteFunnalPage(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("DeleteFunnalPage", ActionType.Delete, ex.Message.ToString(), obj.SessionKey);
                accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                accInfo.StatusMsg = ex.Message.ToString();
            }
            return accInfo;
        }
        public ResultDTO GetTitleTemplate(RequestDTO obj)
        {
            ResultDTO accInfo = null;
            try
            {
                accInfo = _repository.GetTitleTemplate(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetTitleTemplate", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                accInfo.StatusMsg = ex.Message.ToString();
            }
            return accInfo;
        }
        public ResultDTO GetSubTitleTemplate(RequestDTO obj)
        {
            ResultDTO accInfo = null;
            try
            {
                accInfo = _repository.GetSubTitleTemplate(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetSubTitleTemplate", ActionType.GetData, ex.Message.ToString(), obj.SessionKey);
                accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                accInfo.StatusMsg = ex.Message.ToString();
            }
            return accInfo;
        }

        #endregion

        #region FO
        public ResultDTO GetDetailSoloPageByID(RequestDetailByIDDTO obj)
        {
            ResultDTO accInfo = null;
            try
            {
                accInfo = _repository.GetDetailSoloPageByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetDetailSoloPageByID", ActionType.GetData, ex.Message.ToString(), "Call FO method");
                accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                accInfo.StatusMsg = ex.Message.ToString();
            }
            return accInfo;
        }

        public ResultDTO GetDetailFunnalPageByID(RequestDetailByIDDTO obj)
        {
            ResultDTO accInfo = null;
            try
            {
                accInfo = _repository.GetDetailFunnalPageByID(obj);
            }
            catch (Exception ex)
            {
                Utilities.AppLog.WriteLog("GetDetailFunnalPageByID", ActionType.GetData, ex.Message.ToString(), "Call FO method");
                accInfo.StatusCode = Utilities.Common.ConvertErrorCodeToInt(RetCode.ECS9999);
                accInfo.StatusMsg = ex.Message.ToString();
            }
            return accInfo;
        }
        
        #endregion
    }
}
