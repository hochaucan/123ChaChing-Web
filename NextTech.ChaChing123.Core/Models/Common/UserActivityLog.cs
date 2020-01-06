
namespace NextTech.ChaChing123.Core.Models
{
    using System;
    
    public class UserActivityLog
    {
        public int ID { get; set; }
        public string UserID { get; set; }
        public string Activity { get; set; }
        public string ActivityType { get; set; }
        public string PageUrl { get; set; }
        public DateTime ActivityDate { get; set; }
        public string Remarks { get; set; }

        public override string ToString()
        {
            return "[UserActivityLog: " +
                " ID = " + ID.ToString() +
                " UserID = " + UserID +
                " Activity = " + Activity +
                " ActivityType = " + ActivityType +
                " PageUrl = " + PageUrl +
                " ActivityDate = " + ActivityDate.ToString() +
                " Remarks = " + Remarks + "]";
        }

    }

}
