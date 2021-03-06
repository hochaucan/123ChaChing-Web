﻿using System;

namespace NextTech.ChaChing123.Common.Models
{
    public class SoloPageItem1DTO
    {
        public int ID { get; set; }
        public string PageName { get; set; }
        public string Title { get; set; }
        public string Link { get; set; }
        public int Status { get; set; }
        public string ShareCode { get; set; }

        private SoloPageItem1DTO()
        {
            ID = 0;
            Status = 0;
            Title = string.Empty;
            ShareCode = string.Empty;
            PageName = string.Empty;
            Link = string.Empty;
        }
    }
}
