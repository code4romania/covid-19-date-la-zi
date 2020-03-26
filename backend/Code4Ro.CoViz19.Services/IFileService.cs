using System.Threading.Tasks;

namespace Code4Ro.CoViz19.Services
{
    public interface IFileService
    {
        Task<string> GetRawData();
        Task SaveRawData(string fileContent);
    }
}
