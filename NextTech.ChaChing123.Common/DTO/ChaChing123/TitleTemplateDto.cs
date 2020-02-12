using System;

namespace NextTech.ChaChing123.Common.Models
{
   public class TitleTemplateDTO
    {
        public int ID { get; set; }

        public string Title { get; set; }

        //public int Order { get; set; }

        //public int Active { get; set; }

        private TitleTemplateDTO()
        {
            ID = 0;
            Title = string.Empty;
            //Order = 0;
            //Active = 0;
        }
    }
}
