
namespace NextTech.ChaChing123.Core.Models
{
    using System;
    
    public class TransactionLog
    {
        public int ID { get; set; }
        public string UserID { get; set; }
        public string ReferenceNumber { get; set; }
        public string Transactions { get; set; }
        public DateTime TransactionDate { get; set; }
        public string TransactionType { get; set; }
        public string FromAccount { get; set; }
        public string ToAccount { get; set; }
        public Decimal TransactionAmount { get; set; }
        public string Remarks { get; set; }

        public override string ToString()
        {
            return "[TransactionLog: " +
                " ID = " + ID.ToString() +
                " UserID = " + UserID +
                " ReferenceNumber = " + ReferenceNumber +
                " Transactions = " + Transactions +
                " TransactionDate = " + TransactionDate +
                " TransactionType = " + TransactionType +
                " FromAccount = " + FromAccount +
                " ToAccount = " + ToAccount +
                " TransactionAmount = " + TransactionAmount.ToString() +
                " Remarks = " + Remarks + "]";
        }
    }

}
