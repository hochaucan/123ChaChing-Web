namespace NextTech.ChaChing123.Common.Models
{
    public class ResultModel
    {
        public int StatusCode { get; set; }
        public string StatusMsg { get; set; }
        public object Details { get; set; }

        public override string ToString()
        {
            return "[Result: " +
                   " StatusCode = " + StatusCode.ToString() +
                   " StatusMsg = " + StatusMsg +
                   " Details = " + Details + "]";
        }
    }
}