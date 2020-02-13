using NextTech.ChaChing123.Common.Constants;
using System;

namespace NextTech.ChaChing123.Common.Models
{
    public class ResultDTO
    {

        private int statusCode;
        public int StatusCode
        {
            get
            {
                return this.statusCode;
            }
            set
            {
                this.statusCode = value;
            }
        }


        private string statusMsg;
        public string StatusMsg
        {
            get
            {
                return this.statusMsg;
            }
            set
            {
                this.statusMsg = value;
            }
        }
        
        public object Details { get; set; }

        public override string ToString()
        {
            return "[Status: " +
                " StatusCode = " + StatusCode.ToString() +
                " StatusMsg = " + StatusMsg +
                " Details = " + Details + "]";
        }
        
        public void SetContentMsg() {

            if (this.StatusCode== ConvertErrorCodeToInt(RetCode.ECS0000))
            {
                this.statusMsg = RetCodeMsg.ECS0000;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0001))
            {
                this.statusMsg = RetCodeMsg.ECS0001;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0002))
            {
                this.statusMsg = RetCodeMsg.ECS0002;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0003))
            {
                this.statusMsg = RetCodeMsg.ECS0003;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0004))
            {
                this.statusMsg = RetCodeMsg.ECS0004;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0005))
            {
                this.statusMsg = RetCodeMsg.ECS0005;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0006))
            {
                this.statusMsg = RetCodeMsg.ECS0006;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0007))
            {
                this.statusMsg = RetCodeMsg.ECS0007;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0008))
            {
                this.statusMsg = RetCodeMsg.ECS0008;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0009))
            {
                this.statusMsg = RetCodeMsg.ECS0009;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0010))
            {
                this.statusMsg = RetCodeMsg.ECS0010;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0011))
            {
                this.statusMsg = RetCodeMsg.ECS0011;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0012))
            {
                this.statusMsg = RetCodeMsg.ECS0012;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0013))
            {
                this.statusMsg = RetCodeMsg.ECS0013;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0014))
            {
                this.statusMsg = RetCodeMsg.ECS0014;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0015))
            {
                this.statusMsg = RetCodeMsg.ECS0015;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0016))
            {
                this.statusMsg = RetCodeMsg.ECS0016;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0017))
            {
                this.statusMsg = RetCodeMsg.ECS0017;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0018))
            {
                this.statusMsg = RetCodeMsg.ECS0018;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0019))
            {
                this.statusMsg = RetCodeMsg.ECS0019;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0020))
            {
                this.statusMsg = RetCodeMsg.ECS0020;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0021))
            {
                this.statusMsg = RetCodeMsg.ECS0021;
            }

            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0022))
            {
                this.statusMsg = RetCodeMsg.ECS0022;
            }

            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0023))
            {
                this.statusMsg = RetCodeMsg.ECS0023;
            }

            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0024))
            {
                this.statusMsg = RetCodeMsg.ECS0024;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0025))
            {
                this.statusMsg = RetCodeMsg.ECS0025;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0026))
            {
                this.statusMsg = RetCodeMsg.ECS0026;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0027))
            {
                this.statusMsg = RetCodeMsg.ECS0027;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0028))
            {
                this.statusMsg = RetCodeMsg.ECS0028;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS0029))
            {
                this.statusMsg = RetCodeMsg.ECS0029;
            }
            else if (this.StatusCode == ConvertErrorCodeToInt(RetCode.ECS9999))
            {
                this.statusMsg = RetCodeMsg.ECS9999;
            }
        }


        private int ConvertErrorCodeToInt(RetCode value)
        {
            var retCode = -1;
            retCode = (int)Enum.Parse(typeof(RetCode), Enum.GetName(typeof(RetCode), value));
            return retCode;
        }

    }
}
