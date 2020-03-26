using System;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace Code4Ro.CoViz19.Services
{
   public class LocalFileService :IFileService
   {
       private const string FileName = "latestData.json";
       private  string _path = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), FileName);

       private readonly ILogger<LocalFileService> _logger;

       public LocalFileService(ILogger<LocalFileService> logger)
       {
           _logger = logger;
       }

       public async Task<string> GetRawData()
       {
           try
           {
               return await File.ReadAllTextAsync(_path);
           }
           catch (Exception ex)
           {
               _logger.LogError($"Exception retrieving file from {_path}: {ex.Message}");
                return null;
           }
       }

#pragma warning disable 1998
       public async Task SaveRawData(string fileContent)
#pragma warning restore 1998
       {
          File.WriteAllText(_path, fileContent);
        }

   }
}
