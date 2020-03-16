using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;

namespace Code4Ro.CoViz19.Services
{
   public class LocalFileService :IFileService
   {
       private const string FileName = "latestData.json";
       private readonly string _path = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), FileName);


       public string GetRawData()
       {
           return File.ReadAllText(_path);
       }

       public void SaveRawData()
       {
           throw new NotImplementedException();
       }
   }
}
