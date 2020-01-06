using System;
using System.Collections.Generic;

namespace App.Services.Contracts
{
    #region Shared Common

    public class QueryByIdRequest
    {
        public int Id { get; set; }
    }

    public class QueryByIdsRequest
    {
        public Ids IdList { get; set; }
    }

    public class Ids : List<int>
    {
    }

    public class QueryByStringRequest
    {
        public string StringValue { get; set; }
    }

    public class QueryByStringsRequest
    {
        public Strings StringList { get; set; }
    }

    public class Strings : List<string>
    {
    }

    #endregion

}
