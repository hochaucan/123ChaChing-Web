
namespace NextTech.ChaChing123.Core.Models
{
    using System;
        
    public class ResultModel
    {
        public int StatusCode { get; set; }
        public string StatusMsg { get; set; }
        public object Details { get; set; }

        public override string ToString()
        {
            return "[Status: " +
                " StatusCode = " + StatusCode.ToString() +
                " StatusMsg = " + StatusMsg +
                " Details = " + Details + "]";
        }
    }

}
