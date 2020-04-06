using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class RequestMerchantInfoDTO
    {
        public string merchant_id { get; set; }
        public string merchant_password { get; set; }
        public string receiver_email { get; set; }
        public string AppName { get; set; }
        public string Website { get; set; }
        public string ApiLink { get; set; }
        public string ContractNo { get; set; }
        public string ReturnUrl { get; set; }
        public string CancelUrl { get; set; }
        private RequestMerchantInfoDTO()
        {
            merchant_id = string.Empty;
            merchant_password = string.Empty;
            receiver_email = string.Empty;
            AppName = string.Empty;
            Website = string.Empty;
            ApiLink = string.Empty;
            ContractNo = string.Empty;
            ReturnUrl = string.Empty;
            CancelUrl = string.Empty;
        }
    }
}
