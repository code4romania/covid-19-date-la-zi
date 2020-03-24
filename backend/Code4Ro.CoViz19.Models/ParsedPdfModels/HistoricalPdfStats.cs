using System.Collections.Generic;

namespace Code4Ro.CoViz19.Models.ParsedPdfModels
{
    public class HistoricalPdfStats
    {
        public DailyPdfStats CurrentDayStats { get; set; }

        public Dictionary<string, DailyPdfStats> HistoricalData { get; set; }

        public HistoricalPdfStats()
        {
            CurrentDayStats = new DailyPdfStats();
            HistoricalData = new Dictionary<string, DailyPdfStats>();
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
            CurrentDayStats.percentageOfChildren = currentDayData.percentageOfChildren;
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
                    percentageOfChildren = previousDayData.CurrentDayStats.percentageOfChildren
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
