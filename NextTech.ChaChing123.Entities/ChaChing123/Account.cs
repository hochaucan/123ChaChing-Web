namespace NextTech.ChaChing123.Entities
{
    using System;
    using System.ComponentModel.DataAnnotations;
   
    
    public class Account : IEntityBase
    {
        public int ID { get; set; }

        public string FullName { get; set; }

        [MaxLength(50)]
        [Required(ErrorMessage = "UserName must have a value")]
        public string UserName { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        [MaxLength(50)]
        [Required(ErrorMessage = "Password must have a value")]
        public string Password { get; set; }

        public int AccountType { get; set; }

        public string RefCode { get; set; }

        public string ParentCode { get; set; }

        public int Status { get; set; }

        public bool IsLock { get; set; }

        public bool IsLockAffilate { get; set; }

        [MaxLength(50)]
        [Required(ErrorMessage = "ContractNo must have a value")]
        public string ContractNo { get; set; }

        public int RenewalNo { get; set; }

        public string TrailDate { get; set; }

        public string MADA { get; set; }

        public string SubDomain { get; set; }

        [MaxLength(50)]
        public string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime UpdatedDate { get; set; }

        public Account()
        {
            this.FullName = string.Empty;
            this.Email = string.Empty;
            this.UserName = string.Empty;
            this.Email = string.Empty;
            //this.YearOfBirth = new DateTime(1900, 01, 01);
            this.Phone= string.Empty;
            this.RefCode = string.Empty;
            this.Password = string.Empty;
            this.ParentCode = string.Empty;
            this.AccountType = 1;
            this.Status = 1;
            this.CreatedBy = string.Empty;
            this.CreatedDate = DateTime.Now;
            this.UpdatedBy = string.Empty;
            this.UpdatedDate = DateTime.Now;
            //this.XXX = string.Empty;
        }

    }
}
