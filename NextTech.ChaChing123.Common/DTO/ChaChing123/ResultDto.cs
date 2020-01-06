using System;

namespace NextTech.ChaChing123.Common.Models
{
    public class ResultDTO
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
