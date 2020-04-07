using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;

namespace Code4Ro.CoViz19.Reporter.Services
{
    public class FileLoggerService
    {
        public static string GetCurrentLog()
        {
            var path = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location),
                GetCurrentLogFilename());

            try
            {
                using FileStream fileStream = File.Open(path, FileMode.OpenOrCreate, FileAccess.ReadWrite);
                using StreamReader sr = new StreamReader(fileStream, true);
                return sr.ReadToEnd();
            }
            catch (Exception e)
            {
                Debug.WriteLine(e.Message);
                return $"Error reading from file {e.Message}";
            }
        }

        public static void WriteLog(string text)
        {

            var path = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location),
                GetCurrentLogFilename());

            try
            {
                using StreamWriter sw = File.AppendText(path);
                sw.WriteLine($"{DateTime.Now:s}-{text}");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                Debug.WriteLine(e.Message);
            }
        }

        private static string GetCurrentLogFilename()
        {
            return DateTime.Now.ToString("yyyy-MM-dd") + ".txt";
        }
    }
}
