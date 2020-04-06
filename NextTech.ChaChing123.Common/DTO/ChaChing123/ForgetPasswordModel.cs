using System;

namespace NextTech.ChaChing123.Common.Models
{
    public class ForgetPasswordModel
    {
        public string UserName { get; set; }

        public string ActiveKey { get; set; }

        public string NewPassword { get; set; }

        public string OldPassword { get; set; }

        public string SessionKey { get; set; }

        public string Email { get; set; }

        public ForgetPasswordModel()
        {
            SessionKey = Common.Utilities.Common.StringToMD5Hash((Guid.NewGuid()).ToString());
        }

    }
}
