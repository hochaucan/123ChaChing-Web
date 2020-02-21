using System;
using System.Collections.Generic;

namespace NextTech.ChaChing123.Common.Models
{
   public class BODataListDTO
    {
        
        public int Total { get; set; }
        public object Items { get; set; }
        public BODataListDTO()
        {
            Total = 0;
        }
    }
}
