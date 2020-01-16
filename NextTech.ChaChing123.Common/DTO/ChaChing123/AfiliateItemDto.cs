using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class AfiliateItemDTO
    {
  //      A.ID as ID,		
		//A.UserSend as UserName ,
		//(select top 1 FullName from Account as acc where acc.UserName=A.UserSend) as FullName,
		//A.CreatedDate as CreatedDate,
		//(select top 1 AccountType from Account as acc where  acc.UserName=A.UserSend ) as AccountType,
		//A.[Status] as [Status]

        public int ID { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string CreatedDate { get; set; }
        public int AccountType { get; set; }
        public int Status { get; set; }
        private AfiliateItemDTO()
        {
            ID = 0;
            UserName = string.Empty;
            FullName = string.Empty;
            CreatedDate = string.Empty;
            AccountType = 0;
            Status = 0;

        }
    }
}
