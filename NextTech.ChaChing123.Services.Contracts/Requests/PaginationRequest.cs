using System;
using System.Collections.Generic;

namespace App.Services.Contracts
{

    public class PaginationRequest
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public Sort Sort { get; set; }
    }

    public enum SortDirection
    {
        Ascending,
        Descending
    }

    public class Sort
    {
        public string SortBy { get; set; }
        public SortDirection SortDirection { get; set; }
    }
}
