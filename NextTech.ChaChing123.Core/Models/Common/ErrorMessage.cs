namespace NextTech.ChaChing123.Core.Models
{
    
    public class ErrorMessage
    {
        public string Code { get; set; }
        public string Message { get; set; }
               
    }

    public class TraceEventType
    {
        public static string CRITICAL = "Critical";
        public static string ERROR = "Error";
        public static string WARNING = "Warning";
        public static string INFORMATION = "Information";
        public static string VERBOSE = "Verbose";
        public static string START = "Start";
        public static string STOP = "Stop";

    }


    public enum TraceEventTypeEnum
    {
        Critical	= 1,	
        Error	= 2	,
        Warning	= 4	,
        Information	= 8,	
        Verbose	= 16	,
        Start	= 256	,
        Stop	= 512
    }
    

}
