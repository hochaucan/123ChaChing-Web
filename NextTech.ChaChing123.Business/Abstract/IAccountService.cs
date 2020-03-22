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
    /// Interface IAccountService
    /// </summary>
    public interface IAccountService
    {
        ResultDTO CheckLogin(CheckLoginDTO obj);

        ResultDTO Login(LoginModel obj);

        ResultDTO Register(RegisterDTO obj);

        ResultDTO Edit(RequestEditAccountDTO obj);

        ResultDTO Delete(DeleteAccountDTO obj);

        ResultDTO ChangePassword(ChangePasswordModel obj);

        ResultDTO Logout(LogoutDTO obj);

        ResultDTO GetAccountInfo(RequestDTO id);

        IQueryable<Account> GetAllData(Paging obj);
        ResultDTO RequestAccountType(RequestAccountTypeDTO obj);
        ResultDTO UpdateAvatar(RequestUpdateAvatarDTO obj);

        #region Leads
        ResultDTO AddLeadsByAccount(RegisterLeadBySoloPageDTO obj);
        ResultDTO UpdateLeadsByAccount(RegisterLeadBySoloPageDTO obj);
        ResultDTO UpdateLeadsTypeByAccount(RegisterLeadBySoloPageDTO obj);
        ResultDTO GetLeadsDetailByAccount(RegisterLeadBySoloPageDTO obj);
        ResultDTO GetAllLeadsByAccount(LeadsDTO obj);
        ResultDTO SummaryLeadsReportByAccount(SummaryRequestDTO obj);
        ResultDTO SummaryLeadsChartByAccount(SummaryRequestDTO obj);

        ResultDTO UpdateMailChimpInfoByAccount(MailChimpRequestDTO obj);
        ResultDTO GetMailChimpInfoByAccount(RequestDTO obj);
        ResultDTO UpdateBanner(RequestUpdateDTO obj);
        ResultDTO GetBannerLink(RequestDTO obj);
        #endregion
    }
}
