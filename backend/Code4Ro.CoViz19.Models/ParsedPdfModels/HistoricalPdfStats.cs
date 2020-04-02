using System.Collections.Generic;

namespace Code4Ro.CoViz19.Models.ParsedPdfModels
{
    public class HistoricalPdfStats
    {
        public long LasUpdatedOn { get; set; }
        public string LasUpdatedOnString { get; set; }
        public DailyPdfStats CurrentDayStats { get; set; }
        public Dictionary<string, ChartDataDetails> Charts { get; set; }


        public Dictionary<string, DailyPdfStats> HistoricalData { get; set; }

        public HistoricalPdfStats()
        {
            CurrentDayStats = new DailyPdfStats();
            HistoricalData = new Dictionary<string, DailyPdfStats>();
            Charts = new Dictionary<string, ChartDataDetails>();
        }

        public HistoricalPdfStats(DailyPdfStats currentDayData, HistoricalPdfStats previousDayData)
        {
            CurrentDayStats = new DailyPdfStats();
            CurrentDayStats.ParsedOn = currentDayData.ParsedOn;
            CurrentDayStats.ParsedOnString = currentDayData.ParsedOnString;
            CurrentDayStats.FileName = currentDayData.FileName;

            CurrentDayStats.AverageAge = currentDayData.AverageAge;
            CurrentDayStats.NumberInfected = currentDayData.NumberInfected;
            CurrentDayStats.NumberCured = currentDayData.NumberCured;
            CurrentDayStats.NumberDeceased = currentDayData.NumberDeceased;
            CurrentDayStats.PercentageOfWomen = currentDayData.PercentageOfWomen;
            CurrentDayStats.PercentageOfMen = currentDayData.PercentageOfMen;
            CurrentDayStats.PercentageOfChildren = currentDayData.PercentageOfChildren;
            CurrentDayStats.DistributionByAge = currentDayData.DistributionByAge;

            HistoricalData = new Dictionary<string, DailyPdfStats>();
            if (previousDayData?.CurrentDayStats != null)
            {
                HistoricalData.Add(previousDayData.CurrentDayStats.ParsedOnString, new DailyPdfStats
                {
                    ParsedOn = previousDayData.CurrentDayStats.ParsedOn,
                    ParsedOnString = previousDayData.CurrentDayStats.ParsedOnString,
                    FileName = previousDayData.CurrentDayStats.FileName,
                    AverageAge = previousDayData.CurrentDayStats.AverageAge,
                    NumberInfected = previousDayData.CurrentDayStats.NumberInfected,
                    NumberCured = previousDayData.CurrentDayStats.NumberCured,
                    NumberDeceased = previousDayData.CurrentDayStats.NumberDeceased,
                    DistributionByAge = previousDayData.CurrentDayStats.DistributionByAge,
                    PercentageOfWomen = previousDayData.CurrentDayStats.PercentageOfWomen,
                    PercentageOfMen = previousDayData.CurrentDayStats.PercentageOfMen,
                    PercentageOfChildren = previousDayData.CurrentDayStats.PercentageOfChildren
                });

                if (previousDayData.HistoricalData != null)
                {
                    foreach (var kvp in previousDayData.HistoricalData)
                    {
                        HistoricalData.Add(kvp.Key, kvp.Value);
                    }
                }
            }
        }
    }
}
