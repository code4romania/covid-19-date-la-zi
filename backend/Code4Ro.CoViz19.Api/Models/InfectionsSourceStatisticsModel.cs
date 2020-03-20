using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Code4Ro.CoViz19.Api.Models
{
    public class InfectionsSourceStatisticsModel
    {
        public InfectionsSourceTotals Totals { get; set; }
    }

    public class InfectionsSourceTotals
    {
        public long Date { get; set; }
        public string DateString { get; set; }
        public int Extern { get; set; }
        public int Intern { get; set; }
        public int Total { get; set; }

    }

}
