using Code4Ro.CoViz19.Models;
using System.Threading.Tasks;
namespace Code4Ro.CoViz19.Api.Services
{
    public interface IDataProviderService
    {
        Task<ParsedDataModel> GetCurrentData();
    }
}