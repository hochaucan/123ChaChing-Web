/// <summary>
/// <author>Ngô Tấn Phúc</author>
/// <description>Created date: </description>
/// <revision history>Version: 1.0.1</revision history>
/// </summary>
namespace NextTech.ChaChing123.Entities
{
    using System;
    using System.ComponentModel.DataAnnotations;
    /// <summary>
    /// Affiliate Entity
    /// </summary>
    public class Affiliate : IEntityBase
    {
        public int ID { get; set; }

        [MaxLength(50)]
        [Required(ErrorMessage = "UserReceiver must have a value")]
        public string UserReceiver { get; set; }

        [MaxLength(50)]
        [Required(ErrorMessage = "UserSend must have a value")]
        public string UserSend { get; set; }

        public Decimal Amount { get; set; }

        public int Status { get; set; }

        public int CashType { get; set; }

        [MaxLength(50)]
        [Required(ErrorMessage = "ContractNo must have a value")]
        public string ContractNo { get; set; }

        public int OrderType { get; set; }

        [MaxLength(50)]
        public string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime UpdatedDate { get; set; }


    }
}
