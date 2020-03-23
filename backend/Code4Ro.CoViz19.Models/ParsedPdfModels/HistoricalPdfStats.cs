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

            CurrentDayStats.AgerageAge = currentDayData.AgerageAge;
            CurrentDayStats.NumberInfected = currentDayData.NumberInfected;
            CurrentDayStats.NumberCured = currentDayData.NumberCured;
            CurrentDayStats.NumberDeceased = currentDayData.NumberDeceased;
            CurrentDayStats.NumberOfWomen = currentDayData.NumberOfWomen;
            CurrentDayStats.NumberOfMen = currentDayData.NumberOfMen;
            CurrentDayStats.NumberOfChildren = currentDayData.NumberOfChildren;
            CurrentDayStats.DistributionByAge = currentDayData.DistributionByAge;

            HistoricalData = new Dictionary<string, DailyPdfStats>();
            if (previousDayData != null)
            {
                HistoricalData.Add(previousDayData.CurrentDayStats.ParsedOnString, new DailyPdfStats
                {
                    ParsedOn = previousDayData.CurrentDayStats.ParsedOn,
                    ParsedOnString = previousDayData.CurrentDayStats.ParsedOnString,
                    FileName = previousDayData.CurrentDayStats.FileName,
                    AgerageAge = previousDayData.CurrentDayStats.AgerageAge,
                    NumberInfected = previousDayData.CurrentDayStats.NumberInfected,
                    NumberCured = previousDayData.CurrentDayStats.NumberCured,
                    NumberDeceased = previousDayData.CurrentDayStats.NumberDeceased,
                    DistributionByAge = previousDayData.CurrentDayStats.DistributionByAge,
                    NumberOfWomen = previousDayData.CurrentDayStats.NumberOfWomen,
                    NumberOfMen = previousDayData.CurrentDayStats.NumberOfMen,
                    NumberOfChildren = previousDayData.CurrentDayStats.NumberOfChildren
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
