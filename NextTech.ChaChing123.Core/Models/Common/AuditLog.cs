
namespace NextTech.ChaChing123.Core.Models
{
    using System;
    
    public class AuditLog
    {
        public int ID { get; set; }
        public string UserID { get; set; }
        public string TableName { get; set; }
        public string ColumnName { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public string Action { get; set; }
        public DateTime ActionDate { get; set; }
        public string Remarks { get; set; }

        public override string ToString()
        {
            return "[TransactionLog: " +
                " ID = " + ID.ToString() +
                " UserID = " + UserID +
                " TableName = " + TableName +
                " ColumnName = " + ColumnName +
                " OldValue = " + OldValue +
                " NewValue = " + NewValue +
                " Action = " + Action +
                " ActionDate = " + ActionDate.ToString() +
                " Remarks = " + Remarks + "]";
        }

    }

}
