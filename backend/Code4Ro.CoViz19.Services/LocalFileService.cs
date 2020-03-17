using System.IO;
using System.Reflection;
using System.Threading.Tasks;

namespace Code4Ro.CoViz19.Services
{
   public class LocalFileService :IFileService
   {
       private const string FileName = "latestData.json";
       private  string _path = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), FileName);

       public string GetRawData()
       {
           return File.ReadAllText(_path);
       }

       public async Task SaveRawData(string fileContent)
       {
           File.WriteAllText(_path, fileContent);
        }

   }
}
