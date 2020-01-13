using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NextTech.ChaChing123.Services.WebApi.Models
{
    public class PagedResult<T>
    {
        public int PageNo { get; set; }

        public int PageSize { get; set; }

        public int PageCount { get; private set; }

        public long TotalRecordCount { get; set; }

        public PagedResult(IEnumerable<T> items, int pageNo, int pageSize, long totalRecordCount)
        {
            Items = new List<T>(items);

            PageNo = pageNo;
            PageSize = pageSize;
            TotalRecordCount = totalRecordCount;

            PageCount = totalRecordCount > 0
                        ? (int)Math.Ceiling(totalRecordCount / (double)PageSize)
                        : 0;
        }

        public List<T> Items { get; set; }
    }
}