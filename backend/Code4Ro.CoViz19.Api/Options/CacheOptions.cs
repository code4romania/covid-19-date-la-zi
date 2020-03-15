using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Code4Ro.CoViz19.Api.Options
{
    public class CacheOptions
    {
        public bool IsCachingEnabled { get; set; }
        public long CacheLifespan { get; set; }
    }
}
