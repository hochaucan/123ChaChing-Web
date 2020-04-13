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
        ResultDTO SetPasswodForAccount(ChangePasswordModel obj);
        // No9=>TODO       
        ResultDTO ChangeAccountType(ChangeAccountTypeDTO obj);
        // No.10=>TODO
        ResultDTO LockAccount(LockAccountDTO obj);
        // No.11=>TODO
        ResultDTO LockAffialate(LockAffilateDTO obj);
        // No.12=>TODO
        ResultDTO GetAffiliateList(RequestDTO obj);
        // No.13
        ResultDTO UpdateAccountInfo(BOAccountItem2DTO obj);
        // No.14
        ResultDTO GetWithDrawallInfoByAccount(RequestDTO obj);
        // No.15
        ResultDTO SummaryRevenueReport(RequestDTO obj);
        // No.16
        ResultDTO SummaryCommissionReport(RequestDTO obj);
        // No.17
        ResultDTO GetAllWithDrawallInfo(RequestDTO obj);
        // No.18
        ResultDTO SumaryReportChart(SummaryRequestDTO obj);
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
        // No.24
        ResultDTO ApprovetWithDrawallInfoByAccount(WithdrawaltDTO obj);

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
        ResultDTO GetAllLeads(LeadsFilterModel obj);
        #endregion

        #region [QuickReplies]
        // Get All QuickReplies
        ResultDTO GetAllQuickReplies(RequestDTO obj);
        // Add Item
        ResultDTO AddQuickReplies(BOQuickRepliesItemDTO obj);
        // Update Item By ID
        ResultDTO UpdateQuickRepliesByID(BOQuickRepliesItemDTO obj);
        // Delete Item By ID
        ResultDTO DeleteQuickRepliesByID(RequestViewDetaiDTO obj);
        #endregion

        #region [Script]
        // Get All Script
        ResultDTO GetAllScript(RequestDTO obj);
        // Add Item
        ResultDTO AddScript(BOScriptItemDTO obj);
        // Update Item By ID
        ResultDTO UpdateScriptByID(BOScriptItemDTO obj);
        // Delete Item By ID
        ResultDTO DeleteScriptByID(RequestViewDetaiDTO obj);
        #endregion

        #region [Rebuttals]
        // Get All Rebuttals
        ResultDTO GetAllRebuttals(RequestDTO obj);
        // Add Item
        ResultDTO AddRebuttals(BORebuttalsItemDTO obj);
        // Update Item By ID
        ResultDTO UpdateRebuttalsByID(BORebuttalsItemDTO obj);
        // Delete Item By ID
        ResultDTO DeleteRebuttalsByID(RequestViewDetaiDTO obj);
        #endregion

        #region [Documents]
        // Get All Documents
        ResultDTO GetAllDocuments(RequestDTO obj);
        ResultDTO GetAllDocumentsByAccount(RequestDTO obj);
        // Add Item
        ResultDTO AddDocuments(BODocumentsItemDTO obj);
        
        // Update Item By ID
        ResultDTO UpdateDocumentsByID(BODocumentsItemDTO obj);
        // Delete Item By ID
        ResultDTO DeleteDocumentsByID(RequestViewDetaiDTO obj);
        #endregion

        #region [Document]
        // Get All Document
        ResultDTO GetAllDocument(RequestDTO obj);
        ResultDTO GetAllDocumentByCatID(RequestDTO obj);        
        ResultDTO GetDocumentInfoByID(RequestDTO obj);
        
        // Add Item
        ResultDTO AddDocument(BODocumentItemDTO obj);
        // Update Item By ID
        ResultDTO UpdateDocumentByID(BODocumentItemDTO obj);
        // Delete Item By ID
        ResultDTO DeleteDocumentByID(RequestViewDetaiDTO obj);
        #endregion

        #region [BlockTabMarketing]
        // Get All BlockTabMarketing
        ResultDTO GetAllBlockTabMarketing(RequestDTO obj);
        // Add Item
        ResultDTO AddBlockTabMarketing(BOBlockTabMarketingItemDTO obj);
        // Update Item By ID
        ResultDTO UpdateBlockTabMarketingByID(BOBlockTabMarketingItemDTO obj);
        // Delete Item By ID
        ResultDTO DeleteBlockTabMarketingByID(RequestViewDetaiDTO obj);
        #endregion

        #region [Notification]
        // Get All Notification
        ResultDTO GetAllNotification(RequestDTO obj);
        // Add Item
        ResultDTO AddNotification(BONotificationItemDTO obj);
        // Update Item By ID
        ResultDTO UpdateNotificationByID(BONotificationItemDTO obj);
        // Delete Item By ID
        ResultDTO DeleteNotificationByID(RequestViewDetaiDTO obj);
        #endregion

        #region [IntroPage]
        // Get All IntroPage
        ResultDTO GetAllIntroPage(RequestDTO obj);
        // Add Item
        ResultDTO AddIntroPage(BOIntroPageItemDTO obj);
        // Update Item By ID
        ResultDTO UpdateIntroPageByID(BOIntroPageItemDTO obj);
        // Delete Item By ID
        ResultDTO DeleteIntroPageByID(RequestViewDetaiDTO obj);
        #endregion

        #region [Comment]
        // Get All Comment
        ResultDTO GetAllComment(RequestDTO obj);
        // Add Item
        ResultDTO AddComment(BOCommentItemDTO obj);
        // Update Item By ID
        ResultDTO UpdateCommentByID(BOCommentItemDTO obj);
        // Delete Item By ID
        ResultDTO DeleteCommentByID(RequestViewDetaiDTO obj);
        #endregion

        #region [Question]
        // Get All Question
        ResultDTO GetAllQuestion(RequestDTO obj);
        // Add Item
        ResultDTO AddQuestion(BOQuestionItemDTO obj);
        // Update Item By ID
        ResultDTO UpdateQuestionByID(BOQuestionItemDTO obj);
        // Delete Item By ID
        ResultDTO DeleteQuestionByID(RequestViewDetaiDTO obj);
        #endregion

        #region [AffiliateLinks]
        // Get All AffiliateLinks
        ResultDTO GetAllAffiliateLinks(RequestDTO obj);
        // Add Item
        ResultDTO AddAffiliateLinks(BOAffiliateLinksItemDTO obj);
        // Update Item By ID
        ResultDTO UpdateAffiliateLinksByID(BOAffiliateLinksItemDTO obj);
        // Delete Item By ID
        ResultDTO DeleteAffiliateLinksByID(RequestViewDetaiDTO obj);
        #endregion

        #region [AffiliateLink]
        // Get All AffiliateLink
        ResultDTO GetAllAffiliateLink(RequestDTO obj);
        // Add Item
        ResultDTO AddAffiliateLink(BOAffiliateLinkItemDTO obj);
        // Update Item By ID
        ResultDTO UpdateAffiliateLinkByID(BOAffiliateLinkItemDTO obj);
        // Delete Item By ID
        ResultDTO DeleteAffiliateLinkByID(RequestViewDetaiDTO obj);
        #endregion

        #region ContactInfo
        ResultDTO GetAllContactInfo(RequestDTO obj);
        ResultDTO AddContactInfo(RequestContactInfoDTO obj);

        #endregion

        ResultDTO GetConfigValueByKeys(RequestConfigDTO obj);
        ResultDTO UpdateConfigValueByKey (RequestConfigDTO obj);
        //ONStep 2:

    }
}
