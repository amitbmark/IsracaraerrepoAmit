using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IsracaraerAmit.Models
{
    public class RepositoryItem
    {
        [JsonProperty(PropertyName ="id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName ="name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName ="owner")]
        public Owner Avatar { get; set; }
    }

    public class Owner
    {
        public string avatar_url;
    }

    public class RepositoryRoot
    {
        public RepositoryItem[] Items;
    }


}
