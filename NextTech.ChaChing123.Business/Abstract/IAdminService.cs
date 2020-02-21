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
    /// Interface IAdminService
    /// </summary>
    public interface IAdminService
    {
        // No.1
        ResultDTO GetAccountList(RequestOrderListDTO obj);
        // No.2
        ResultDTO GetOrderList(RequestOrderListDTO obj);
        // No.3
        ResultDTO GetAffialateList(RequestDTO obj);
        // No.4
        ResultDTO UpdatePaymentState(PaymentContractDTO obj);
        // No.5
        ResultDTO UpdatePaymentAffiliateState(PaymentAffiliateDTO obj);
        // No.6
        ResultDTO GetAccountInfo(RequestDTO obj);
        // No7=>TODO
        ResultDTO SetDefautAccount(RequestDTO obj);
        // No8=>TODO
        ResultDTO SetPasswodForAccount(RequestDTO obj);
        // No9=>TODO       
        ResultDTO ChangeAccountType(ChangeAccountTypeDTO obj);
        // No.10=>TODO
        ResultDTO LockAccount(LockAccountDTO obj);
        // No.11=>TODO
        ResultDTO LockAffialate(LockAffilateDTO obj);
        // No.12=>TODO
        ResultDTO GetAffiliateListByAccount(RequestDTO obj);
        // No.13
        ResultDTO UpdateAccountInfo(RequestDTO obj);
        // No.14
        ResultDTO GetWithDrawallInfoByAccount(RequestDTO obj);
        // No.15
        ResultDTO SummaryRevenueReport(RequestDTO obj);
        // No.16
        ResultDTO SummaryCommissionReport(RequestDTO obj);
        // No.17
        ResultDTO GetAllWithDrawallInfo(RequestDTO obj);
        // No.18
        ResultDTO SumaryReportChart(RequestDTO obj);
        // No.19
        ResultDTO GetAllLead(RequestDTO obj);
        // No.20
        ResultDTO ActiveAccount(ActiveAccountDTO obj);
        // No.21
        ResultDTO Login(LoginModel obj);
        // No.22
        ResultDTO Logout(LogoutDTO obj);
        // No.23
        ResultDTO ChangePassword(ChangePasswordModel obj);

        #region [TitleTemplate]
        ResultDTO AddTitleTemplate(BOTitleTemplateDTO obj);
        ResultDTO EditTitleTemplate(BOTitleTemplateDTO obj);
        ResultDTO DeleteTitleTemplate(BOTitleTemplateDTO obj);
        ResultDTO GetAllTitleTemplate(RequestDTO obj);
        #endregion

        #region [SubTitleTemplate]
        ResultDTO AddSubTitleTemplate(BOTitleTemplateDTO obj);
        ResultDTO EditSubTitleTemplate(BOTitleTemplateDTO obj);
        ResultDTO DeleteSubTitleTemplate(BOTitleTemplateDTO obj);
        ResultDTO GetAllSubTitleTemplate(RequestDTO obj);
        #endregion

        #region Leads
        ResultDTO GetAllLeads(LeadsDTO obj);
        #endregion
    }
}
