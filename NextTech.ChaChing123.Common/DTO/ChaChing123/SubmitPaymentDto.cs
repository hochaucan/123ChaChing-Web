using System;

namespace NextTech.ChaChing123.Common.Models
{
    public class SubmitPaymentDTO
    {
        public string OptionPayment { get; set; }
        public string BankCode { get; set; }        
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string SessionKey { get; set; }

        public SubmitPaymentDTO()
        {
            OptionPayment = string.Empty;
            BankCode = string.Empty;
            Description = string.Empty;
            FullName = string.Empty;
            Email = string.Empty;
            Phone = string.Empty;
            SessionKey = string.Empty;
            Amount = 0;
        }
    }
}
