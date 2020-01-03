using App.Entities;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace App.Services.Contracts
{
    [Serializable]
    [DataContract]
    public class ApplicationRequest
    {
        [DataMember]
        public Application ApplicationViewModel { get; set; }

        //[DataMember]
        //public int TotalRowCount { get; set; }
    }

    [Serializable]
    [DataContract]
    public class ApplicationViewModel
    {
        [DataMember]
        public int ID { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Description { get; set; }
    }
}
