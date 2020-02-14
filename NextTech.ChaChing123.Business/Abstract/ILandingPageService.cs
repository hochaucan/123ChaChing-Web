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
        ResultDTO GetSoloInfoByShareCode(RequestSoloByShareCodeDTO obj);
        ResultDTO GetDetailSoloPage(RequestViewDetaiDTO obj);        
        ResultDTO GetAllSoloPage(RequestDTO obj);
        ResultDTO AddSoloPage (SolaPageDTO obj);
        ResultDTO EditSoloPage(SolaPageDTO obj);
        ResultDTO DeleteSoloPage(RequestViewDetaiDTO obj);
        ResultDTO GetDetailFunnalPage(RequestViewDetaiDTO obj);
        ResultDTO GetAllFunnalPage(RequestDTO obj);
        ResultDTO AddFunnalPage(RequestFunnalPageDTO obj);
        ResultDTO EditFunnalPage(RequestFunnalPageDTO obj);
        ResultDTO DeleteFunnalPage(RequestViewDetaiDTO obj);
        ResultDTO GetTitleTemplate(RequestDTO obj);
        ResultDTO GetSubTitleTemplate(RequestDTO obj);
        //FO
        ResultDTO GetDetailSoloPageByID(RequestDetailByIDDTO obj);
        ResultDTO GetDetailFunnalPageByID(RequestDetailByIDDTO obj);
    }
}
