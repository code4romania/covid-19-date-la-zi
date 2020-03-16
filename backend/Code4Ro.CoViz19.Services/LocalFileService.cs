using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Code4Ro.CoViz19.Services
{
   public class LocalFileService :IFileService
   {
       private const string FileName = "latestData.json";
       private  string _path = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), FileName);


       public string GetRawData()
       {
           _path = @"https://stdatelazi.blob.core.windows.net/date/latestData.json";
           return File.ReadAllText(_path);
       }

       public Task SaveRawData(string fileContent)
       {
           throw new NotImplementedException();
       }

   }
}
