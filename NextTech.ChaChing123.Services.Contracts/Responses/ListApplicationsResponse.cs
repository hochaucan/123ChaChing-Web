using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace BTMU.APF.Services.Contracts
{
    [Serializable]
    [DataContract]
    public class ListApplicationResponse
    {
        //[DataMember]
        //public List<Application> ApplicationCollection { get; set; }

        [DataMember]
        public int TotalRowCount { get; set; }
    }
}
