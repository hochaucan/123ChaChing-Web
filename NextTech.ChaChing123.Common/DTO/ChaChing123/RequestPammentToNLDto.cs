using System;

namespace NextTech.ChaChing123.Common.Models
{
    public class RequestPaymentToNL
    {
        private String _Funtion = "SetExpressCheckout";

        public String Funtion
        {
            get { return _Funtion; }
        }

        private String _Version = "3.1";

        public String Version
        {
            get { return _Version; }
        }

        private String _apilink = String.Empty;
        public String APILink
        {
            get { return _apilink; }
            set { _apilink = value; }
        }

        private String _cur_code = String.Empty;
        public String cur_code
        {
            get { return _cur_code; }
            set { _cur_code = value; }
        }

        private String _discount_amount = String.Empty;
        public String Discount_amount
        {
            get { return _discount_amount; }
            set { _discount_amount = value; }
        }

        private String _Merchant_id = String.Empty;
        public String Merchant_id
        {
            get { return _Merchant_id; }
            set { _Merchant_id = value; }
        }
        private String _Receiver_email = String.Empty;

        public String Receiver_email
        {
            get { return _Receiver_email; }
            set { _Receiver_email = value; }
        }
        private String _Merchant_password = String.Empty;

        public String Merchant_password
        {
            get { return _Merchant_password; }
            set { _Merchant_password = value; }
        }
        private String _Order_code = String.Empty;

        public String Order_code
        {
            get { return _Order_code; }
            set { _Order_code = value; }
        }
        private String _Total_amount = String.Empty;

        public String Total_amount
        {
            get { return _Total_amount; }
            set { _Total_amount = value; }
        }
        private String _Payment_method = String.Empty;

        public String Payment_method
        {
            get { return _Payment_method; }
            set { _Payment_method = value; }
        }
        private String _Payment_type = String.Empty;

        public String Payment_type
        {
            get { return _Payment_type; }
            set { _Payment_type = value; }
        }
        private String _bank_code = String.Empty;

        public String bank_code
        {
            get { return _bank_code; }
            set { _bank_code = value; }
        }
        private String _order_description = String.Empty;

        public String order_description
        {
            get { return _order_description; }
            set { _order_description = value; }
        }
        private String _fee_shipping = String.Empty;

        public String fee_shipping
        {
            get { return _fee_shipping; }
            set { _fee_shipping = value; }
        }
        private String _tax_amount = String.Empty;

        public String tax_amount
        {
            get { return _tax_amount; }
            set { _tax_amount = value; }
        }

        private String _return_url = String.Empty;

        public String return_url
        {
            get { return _return_url; }
            set { _return_url = value; }
        }
        private String _cancel_url = String.Empty;

        public String cancel_url
        {
            get { return _cancel_url; }
            set { _cancel_url = value; }
        }
        private String _time_limit = String.Empty;

        public String time_limit
        {
            get { return _time_limit; }
            set { _time_limit = value; }
        }
        private String _Buyer_fullname = String.Empty;

        public String Buyer_fullname
        {
            get { return _Buyer_fullname; }
            set { _Buyer_fullname = value; }
        }
        private String _Buyer_email = String.Empty;

        public String Buyer_email
        {
            get { return _Buyer_email; }
            set { _Buyer_email = value; }
        }
        private String _Buyer_mobile = String.Empty;

        public String Buyer_mobile
        {
            get { return _Buyer_mobile; }
            set { _Buyer_mobile = value; }
        }
    }
}
