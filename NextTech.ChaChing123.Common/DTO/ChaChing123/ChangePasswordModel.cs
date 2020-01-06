using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class ChangePasswordModel
    {
        public int UserId { get; set; }

        public string NewPassword { get; set; }

        public string OldPassword { get; set; }

        public string SessionKey { get; set; }

    }
}
