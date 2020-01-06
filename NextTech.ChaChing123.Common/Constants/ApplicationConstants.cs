using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NextTech.ChaChing123.Common.Constants
{
    /// <summary>
    /// Class ApplicationErrorConstants.
    /// </summary>
    public class ApplicationErrorConstants
    {

    }

    /// <summary>
    /// Class ActionType.
    /// </summary>
    public class ActionType
    {
        //public const string Get = "Get info";
        public const string Add = "Add new";
        public const string Update = "Update";
        public const string Delete = "Delete";
        public const string Import = "Import Data";

        public const string Login = "Login";
        public const string Logout = "Logout";
    }

    /// <summary>
    /// Enum RetCode
    /// </summary>
    public enum RetCode : int
    {
        ECS0000 = 0,
        ECS0001 = 1,
        ECS0002 = 2,
        ECS0003 = 3,
        ECS0004 = 4,
        ECS0005 = 5,
        ECS0006 = 6,
        ECS0007 = 7,
        ECS0008 = 8,
        ECS0009 = 9,
        ECS0010 = 10,
        ECS0011 = 11,
        ECS0012 = 12,
        ECS0013 = 13,
        ECS0014 = 14,
        ECS0015 = 15,
        ECS0016 = 16,
        ECS0017 = 17,
        ECS0018 = 18,
        ECS0019 = 19,
        ECS0020 = 20,
        ECS0021 = 21,
        ECS0022 = 22,
        ECS0023 = 23,
        ECS0024 = 24,
        ECS0025 = 25,
        ECS0026 = 26,
        ECS0027 = 27,
        ECS0028 = 28,
        ECS0029 = 29,
    }

    public class  RetCodeMsg 
    {
        public const string ECS000 = "Thành công";
        public const string ECS001 = "Tên đăng nhập không được để trống";
        public const string ECS002 = "Họ và tên không hợp lệ";
        public const string ECS003 = "Email không được để trống";
        public const string ECS004 = "Email không hợp lệ";
        public const string ECS005 = "Email đã được đăng ký";
        public const string ECS006 = "Mã giới thiếu không được để trống";
        public const string ECS007 = "Mã giới thiệu không hợp lệ";
        public const string ECS008 = "Số điện thoại không được để trống";
        public const string ECS009 = "Số điện thoại đã được đăng ký";
        public const string ECS010 = "Mật khẩu không hợp lệ";
        public const string ECS011 = "Mật khẩu củ không đúng";
        public const string ECS012 = "Mật khẩu mới không hợp lệ";
    }

}