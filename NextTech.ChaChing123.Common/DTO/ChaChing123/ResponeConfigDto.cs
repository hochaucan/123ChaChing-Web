using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class ResponeCofigDTO
    {
        public string Key { get; set; }

        public string Value { get; set; }

        private ResponeCofigDTO()
        {
            Key = string.Empty;
            Value = string.Empty;
        }
    }
}
