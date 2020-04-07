using System;

namespace Code4Ro.CoViz19.Reporter.Extensions
{
    public interface IScheduleConfig<T>
    {
        string CronExpression { get; set; }
        TimeZoneInfo TimeZoneInfo { get; set; }
    }
}