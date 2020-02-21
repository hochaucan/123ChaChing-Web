/// <summary>
/// <author>Ngo tan  Phuc</author>
/// <description>Created date: </description>
/// <revision history>Version: 1.0.1</revision history>
/// </summary>

namespace NextTech.ChaChing123.Business
{
    using NextTech.ChaChing123.Entities;
    using System.Linq;
    using NextTech.ChaChing123.Common.Models;
    using NextTech.ChaChing123.Core.Models;

    /// <summary>
    /// Interface ILandingPageService
    /// </summary>
    public interface ILandingPageService
    {
        #region Solo
        ResultDTO GetSoloInfoByShareCode(RequestSoloByShareCodeDTO obj);
        ResultDTO GetDetailSoloPage(RequestViewDetaiDTO obj);        
        ResultDTO GetAllSoloPage(RequestDTO obj);
        ResultDTO GetAllPublicSoloPage(RequestDTO obj);
        ResultDTO AddSoloPage (SolaPageDTO obj);
        ResultDTO EditSoloPage(SolaPageDTO obj);
        ResultDTO DeleteSoloPage(RequestViewDetaiDTO obj);
        #endregion

        #region Funnal
        ResultDTO GetDetailFunnalPage(RequestViewDetaiDTO obj);
        ResultDTO GetAllFunnalPage(RequestDTO obj);
        ResultDTO AddFunnalPage(RequestFunnalPageDTO obj);
        ResultDTO EditFunnalPage(RequestFunnalPageDTO obj);
        ResultDTO DeleteFunnalPage(RequestViewDetaiDTO obj);
        #endregion

        ResultDTO GetTitleTemplate(RequestDTO obj);
        ResultDTO GetSubTitleTemplate(RequestDTO obj);
        ResultDTO GetFunnalDetailByReivew(RequestNextSoloDTO obj);
        ResultDTO GetFunnalDetailByPublic(RequestNextSoloDTO obj);
        
        //FO
        ResultDTO GetDetailSoloPageByID(RequestDetailByIDDTO obj);
        ResultDTO GetDetailFunnalPageByID(RequestDetailByIDDTO obj);
        ResultDTO RegisterLeadBySoloPage(RegisterLeadBySoloPageDTO obj);
    }
}
