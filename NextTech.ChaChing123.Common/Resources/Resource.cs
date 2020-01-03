using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NextTech.ChaChing123.Common.Resources
{
    public class Resource
    {
        // all error code and descrition should be here

        // error message
        public const string E0001 = "ERR0001: Model State is not valid.";
        public const string E0002 = "ERR0002: Error occured while invoking[MethodName] method.";
        public const string E0003 = "ERR0003: Error occured while invoking[MethodName] method.";
        public const string E0004 = "ERR0004: The record you are working on has been modified by another user. Changes you have made have not been saved, please resubmit.";

        public const string E0005 = "ERR0005: The format file import is corrup!";
        public const string E0006 = "ERR0006: Please, choose item that you want import data!";
        public const string E0007 = "ERR0007: The file import is not support in system!";
        public const string E0008 = "You do not have permission to import {0}!";

        // warning message
        public const string W0001 = "WAR0004: No data found.";

        public const string ErrorState = "Error";
        public const string CompletedState = "Completed";

        // NBL ErrorCode
        public const string ECS0001 = "ECS0001: Thông tin này đã được người dùng khác sửa đổi. Các thay đổi bạn đã thực hiện chưa được lưu, vui lòng gửi lại!";

       
    }
}
