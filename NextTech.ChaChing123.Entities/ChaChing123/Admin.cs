namespace NextTech.ChaChing123.Entities
{
    using System;
    using System.ComponentModel.DataAnnotations;
   
    
    public class Admin : IEntityBase
    {
        public int ID { get; set; }

        [MaxLength(50)]
        public string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime UpdatedDate { get; set; }

        public Admin()
        {
            this.CreatedBy = string.Empty;
            this.CreatedDate = DateTime.Now;
            this.UpdatedBy = string.Empty;
            this.UpdatedDate = DateTime.Now;
        }

    }
}
