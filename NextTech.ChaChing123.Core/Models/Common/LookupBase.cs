
namespace NextTech.ChaChing123.Core.Models
{
    using System;
    using System.Runtime.Serialization;
    public class LookupBase
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public bool Inactive { get; set; }
        public string LastChangedBy { get; set; }
    }
}
