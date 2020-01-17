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

        ECS9999 = 9999,
    }

    public class  RetCodeMsg 
    {
        public const string ECS0000 = "Thành công";
        public const string ECS0001 = "Tên đăng nhập không được để trống";
        public const string ECS0002 = "Họ và tên không hợp lệ";
        public const string ECS0003 = "Email không được để trống";
        public const string ECS0004 = "Email không hợp lệ";
        public const string ECS0005 = "Email đã được đăng ký";
        public const string ECS0006 = "Mã giới thiếu không được để trống";
        public const string ECS0007 = "Mã giới thiệu không hợp lệ";
        public const string ECS0008 = "Số điện thoại không được để trống";
        public const string ECS0009 = "Số điện thoại đã được đăng ký";
        public const string ECS0010 = "Mật khẩu không hợp lệ";
        public const string ECS0011 = "Mật khẩu củ không đúng";
        public const string ECS0012 = "Mật khẩu mới không hợp lệ";
        public const string ECS0013 = "Tài khoản đăng nhập không tồn tại hoặc mặt khẩu không đúng";
        public const string ECS0014 = "Tài khoản đăng nhập không tồn tại";
        public const string ECS0015 = "Tài khoản đang bị khóa";
        public const string ECS0016 = "Tài khoản đang chờ duyệt. Vui lòng liên hệ quản trị để biết thêm chi tiết.";
        public const string ECS0017 = "Tài khoản chưa đăng nhập.";
        public const string ECS0018 = "Tài khoản đã được đăng ký.";
        public const string ECS0019 = "Tài khoản không có quyền chức năng này.Vui lòng liên hệ tới quản trị viên để được hỗ trợ.";
        public const string ECS0020 = "Thông tin thanh toán không hợp lệ.";
        public const string ECS0021 = "Cập nhật trạng thái hợp đồng lỗi.Vui lòng liên hệ quản trị viên để được hỗ trợ.";

        public const string ECS0022 = "Tài khoản đã thanh toán và đang chờ duyệt. Vui lòng liên hệ quản trị để biết thêm chi tiết.";
        public const string ECS0023 = "Tài khoản đã ngừng hoạt động.";
        public const string ECS0024 = "Tài khoản đã hoàn trả.";



        public const string ECS9999 = "Lỗi không xác định.";
    }

}