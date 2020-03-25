using Code4Ro.CoViz19.Models;
using System.Threading.Tasks;
using Code4Ro.CoViz19.Models.ParsedPdfModels;

namespace Code4Ro.CoViz19.Api.Services
{
    public interface IDataProviderService
    {
        Task<ParsedDataModel> GetCurrentData();
        Task<HistoricalPdfStats> GetCurrentPdfData();
    }
}