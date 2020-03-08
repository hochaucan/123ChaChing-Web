using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class LoginModel
    {
        public string UserName { get; set; }

        public string Password { get; set; }

        public string SessionKey { get; set; }

        //public string LoginDate { get; set; }
        

        public int LoginType { get; set; }

        //public int ErrorCode { get; set; }
        public string UserAdmin { get; set; }

        public LoginModel()
        {
            UserAdmin = string.Empty;
            LoginType = 1;
            SessionKey = Common.Utilities.Common.StringToMD5Hash((Guid.NewGuid()).ToString());
        }
    }
}
