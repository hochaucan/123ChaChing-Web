using App.Entities;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace App.Services.Contracts
{
    [Serializable]
    [DataContract]
    public class RoleRequest
    {
        [DataMember]
        public Role RoleViewModel { get; set; }

        //[DataMember]
        //public int TotalRowCount { get; set; }
    }

    [Serializable]
    [DataContract]
    public class RoleViewModel
    {
        [DataMember]
        public int ID { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public bool IsSystemAdmin { get; set; }
    }
}
