using Code4Ro.CoViz19.Models;
using System.Threading.Tasks;
using Newtonsoft.Json;
namespace Code4Ro.CoViz19.Api.Services
{
    public class DummyDataProviderService : IDataProviderService
    {
        private ParsedDataModel _fakeData;


        public Task<ParsedDataModel> GetCurrentData()
        {
            if (_fakeData == null)
            {
                _fakeData = JsonConvert.DeserializeObject<ParsedDataModel>(jsonData);
            }

            return Task.FromResult(_fakeData);
        }


        #region data
        private static string jsonData = @"
   {
  ""liveUpdateData"": [
    {
      ""timestamp"": ""2020-02-26T16:00:00"",
      ""numberDiagnosed"": 0,
      ""numberCured"": 0,
      ""numberQuarantined"": 69,
      ""numberMonitoredAtHome"": 4818,
      ""emergencyCalls"": null,
      ""hotLineCalls"": null,
      ""numberCriminalCases"": null,
      ""probesAnalyzed"": null,
      ""probesInAnalysis"": null
    },
    {
      ""timestamp"": ""2020-02-27T16:00:00"",
      ""numberDiagnosed"": 1,
      ""numberCured"": 0,
      ""numberQuarantined"": 99,
      ""numberMonitoredAtHome"": 7174,
      ""emergencyCalls"": null,
      ""hotLineCalls"": null,
      ""numberCriminalCases"": null,
      ""probesAnalyzed"": null,
      ""probesInAnalysis"": null
    },
    {
      ""timestamp"": ""2020-02-28T16:00:00"",
      ""numberDiagnosed"": 3,
      ""numberCured"": 0,
      ""numberQuarantined"": 47,
      ""numberMonitoredAtHome"": 8356,
      ""emergencyCalls"": null,
      ""hotLineCalls"": null,
      ""numberCriminalCases"": 1,
      ""probesAnalyzed"": null,
      ""probesInAnalysis"": null
    },
    {
      ""timestamp"": ""2020-02-29T16:00:00"",
      ""numberDiagnosed"": 3,
      ""numberCured"": 0,
      ""numberQuarantined"": 52,
      ""numberMonitoredAtHome"": 8796,
      ""emergencyCalls"": null,
      ""hotLineCalls"": null,
      ""numberCriminalCases"": 1,
      ""probesAnalyzed"": null,
      ""probesInAnalysis"": null
    },
    {
      ""timestamp"": ""2020-03-01T16:00:00"",
      ""numberDiagnosed"": 3,
      ""numberCured"": 1,
      ""numberQuarantined"": 52,
      ""numberMonitoredAtHome"": 8085,
      ""emergencyCalls"": null,
      ""hotLineCalls"": null,
      ""numberCriminalCases"": null,
      ""probesAnalyzed"": null,
      ""probesInAnalysis"": 20
    },
    {
      ""timestamp"": ""2020-03-02T16:00:00"",
      ""numberDiagnosed"": 3,
      ""numberCured"": 1,
      ""numberQuarantined"": 42,
      ""numberMonitoredAtHome"": 9012,
      ""emergencyCalls"": 80,
      ""hotLineCalls"": 646,
      ""numberCriminalCases"": null,
      ""probesAnalyzed"": 475,
      ""probesInAnalysis"": 13
    },
    {
      ""timestamp"": ""2020-03-03T16:00:00"",
      ""numberDiagnosed"": 4,
      ""numberCured"": 1,
      ""numberQuarantined"": 37,
      ""numberMonitoredAtHome"": 9639,
      ""emergencyCalls"": null,
      ""hotLineCalls"": null,
      ""numberCriminalCases"": null,
      ""probesAnalyzed"": 551,
      ""probesInAnalysis"": null
    },
    {
      ""timestamp"": ""2020-03-04T16:00:00"",
      ""numberDiagnosed"": 6,
      ""numberCured"": 1,
      ""numberQuarantined"": 35,
      ""numberMonitoredAtHome"": 10771,
      ""emergencyCalls"": null,
      ""hotLineCalls"": null,
      ""numberCriminalCases"": null,
      ""probesAnalyzed"": 579,
      ""probesInAnalysis"": null
    },
    {
      ""timestamp"": ""2020-03-05T16:00:00"",
      ""numberDiagnosed"": 6,
      ""numberCured"": 3,
      ""numberQuarantined"": 35,
      ""numberMonitoredAtHome"": 11731,
      ""emergencyCalls"": null,
      ""hotLineCalls"": null,
      ""numberCriminalCases"": null,
      ""probesAnalyzed"": 657,
      ""probesInAnalysis"": null
    },
    {
      ""timestamp"": ""2020-03-06T16:00:00"",
      ""numberDiagnosed"": 8,
      ""numberCured"": 3,
      ""numberQuarantined"": 22,
      ""numberMonitoredAtHome"": 12619,
      ""emergencyCalls"": null,
      ""hotLineCalls"": null,
      ""numberCriminalCases"": null,
      ""probesAnalyzed"": 734,
      ""probesInAnalysis"": null
    },
    {
      ""timestamp"": ""2020-03-07T17:00:00"",
      ""numberDiagnosed"": 11,
      ""numberCured"": 3,
      ""numberQuarantined"": 16,
      ""numberMonitoredAtHome"": 12977,
      ""emergencyCalls"": null,
      ""hotLineCalls"": null,
      ""numberCriminalCases"": null,
      ""probesAnalyzed"": 809,
      ""probesInAnalysis"": null
    },
    {
      ""timestamp"": ""2020-03-08T17:00:00"",
      ""numberDiagnosed"": 14,
      ""numberCured"": 5,
      ""numberQuarantined"": 11,
      ""numberMonitoredAtHome"": 12877,
      ""emergencyCalls"": null,
      ""hotLineCalls"": null,
      ""numberCriminalCases"": null,
      ""probesAnalyzed"": 948,
      ""probesInAnalysis"": null
    },
    {
      ""timestamp"": ""2020-03-09T16:00:00"",
      ""numberDiagnosed"": 15,
      ""numberCured"": 5,
      ""numberQuarantined"": 27,
      ""numberMonitoredAtHome"": 11198,
      ""emergencyCalls"": null,
      ""hotLineCalls"": null,
      ""numberCriminalCases"": 18,
      ""probesAnalyzed"": 1010,
      ""probesInAnalysis"": null
    },
    {
      ""timestamp"": ""2020-03-10T16:00:00"",
      ""numberDiagnosed"": 25,
      ""numberCured"": 5,
      ""numberQuarantined"": 107,
      ""numberMonitoredAtHome"": 11505,
      ""emergencyCalls"": null,
      ""hotLineCalls"": null,
      ""numberCriminalCases"": 19,
      ""probesAnalyzed"": 1179,
      ""probesInAnalysis"": null
    },
    {
      ""timestamp"": ""2020-03-11T17:00:00"",
      ""numberDiagnosed"": 36,
      ""numberCured"": 6,
      ""numberQuarantined"": 577,
      ""numberMonitoredAtHome"": 12678,
      ""emergencyCalls"": null,
      ""hotLineCalls"": null,
      ""numberCriminalCases"": 20,
      ""probesAnalyzed"": 1441,
      ""probesInAnalysis"": null
    },
    {
      ""timestamp"": ""2020-03-12T16:00:00"",
      ""numberDiagnosed"": 48,
      ""numberCured"": 6,
      ""numberQuarantined"": 1556,
      ""numberMonitoredAtHome"": 13646,
      ""emergencyCalls"": null,
      ""hotLineCalls"": null,
      ""numberCriminalCases"": 30,
      ""probesAnalyzed"": 1921,
      ""probesInAnalysis"": null
    },
    {
      ""timestamp"": ""2020-03-13T16:00:00"",
      ""numberDiagnosed"": 75,
      ""numberCured"": 6,
      ""numberQuarantined"": 2298,
      ""numberMonitoredAtHome"": 13723,
      ""emergencyCalls"": null,
      ""hotLineCalls"": null,
      ""numberCriminalCases"": 34,
      ""probesAnalyzed"": 2545,
      ""probesInAnalysis"": null
    },
    {
      ""timestamp"": ""2020-03-14T16:00:00"",
      ""numberDiagnosed"": 102,
      ""numberCured"": 6,
      ""numberQuarantined"": 2652,
      ""numberMonitoredAtHome"": 14573,
      ""emergencyCalls"": null,
      ""hotLineCalls"": null,
      ""numberCriminalCases"": 35,
      ""probesAnalyzed"": 2929,
      ""probesInAnalysis"": null
    },
    {
      ""timestamp"": ""2020-03-15T17:00:00"",
      ""numberDiagnosed"": 139,
      ""numberCured"": 9,
      ""numberQuarantined"": 2855,
      ""numberMonitoredAtHome"": 14640,
      ""emergencyCalls"": 1231,
      ""hotLineCalls"": 5614,
      ""numberCriminalCases"": 38,
      ""probesAnalyzed"": 3205,
      ""probesInAnalysis"": null
    },
    {
      ""timestamp"": ""2020-03-16T16:00:00"",
      ""numberDiagnosed"": 168,
      ""numberCured"": 9,
      ""numberQuarantined"": 3078,
      ""numberMonitoredAtHome"": 14845,
      ""emergencyCalls"": null,
      ""hotLineCalls"": null,
      ""numberCriminalCases"": 38,
      ""probesAnalyzed"": 3708,
      ""probesInAnalysis"": null
    },
    {
      ""timestamp"": ""2020-03-17T10:00:00"",
      ""numberDiagnosed"": 184,
      ""numberCured"": 16,
      ""numberQuarantined"": 3282,
      ""numberMonitoredAtHome"": 16610,
      ""emergencyCalls"": 1349,
      ""hotLineCalls"": 6187,
      ""numberCriminalCases"": 38,
      ""probesAnalyzed"": null,
      ""probesInAnalysis"": null
    }
  ],
  ""patientsInfo"": [
    {
      ""patientNumber"": 1,
      ""gender"": ""man"",
      ""age"": 25,
      ""domicile"": ""Gorj"",
      ""infectionContact"": ""contact cetateanul italian"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": ""Bals"",
      ""healthState"": ""vindecat"",
      ""isCured"": true
    },
    {
      ""patientNumber"": 2,
      ""gender"": ""man"",
      ""age"": 45,
      ""domicile"": ""Maramures"",
      ""infectionContact"": ""a calatorit in Italia"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": ""Cluj"",
      ""healthState"": ""afectiuni cronice"",
      ""isCured"": false
    },
    {
      ""patientNumber"": 3,
      ""gender"": ""woman"",
      ""age"": 38,
      ""domicile"": ""Timisoara"",
      ""infectionContact"": ""a calatorit la Bergamo"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": ""Timisoara"",
      ""healthState"": ""vindecat"",
      ""isCured"": true
    },
    {
      ""patientNumber"": 4,
      ""gender"": ""man"",
      ""age"": 47,
      ""domicile"": ""Timisoara"",
      ""infectionContact"": ""contact direct pacient 3"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": ""Timisoara"",
      ""healthState"": ""vindecat"",
      ""isCured"": true
    },
    {
      ""patientNumber"": 5,
      ""gender"": ""man"",
      ""age"": 16,
      ""domicile"": ""Timisoara,"",
      ""infectionContact"": ""contact direct pacient 4"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": ""Timisoara"",
      ""healthState"": ""vindecat"",
      ""isCured"": true
    },
    {
      ""patientNumber"": 6,
      ""gender"": ""man"",
      ""age"": 71,
      ""domicile"": ""Suceava,"",
      ""infectionContact"": ""a calatorit in Lombardia"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": ""Iasi"",
      ""healthState"": ""boala cronica"",
      ""isCured"": false
    },
    {
      ""patientNumber"": 7,
      ""gender"": ""woman"",
      ""age"": 16,
      ""domicile"": ""Timisoara,"",
      ""infectionContact"": ""Colega cu pacientul 5"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": ""Timisoara"",
      ""healthState"": ""vindecat"",
      ""isCured"": true
    },
    {
      ""patientNumber"": 8,
      ""gender"": ""man"",
      ""age"": 51,
      ""domicile"": ""Olt"",
      ""infectionContact"": ""contact al pacientului 4, au calatorit impreuna"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": ""Craiova"",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 9,
      ""gender"": ""man"",
      ""age"": 40,
      ""domicile"": ""Hunedoara"",
      ""infectionContact"": ""a calatorit la Bergamo"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": ""Timisoara"",
      ""healthState"": ""vindecat"",
      ""isCured"": true
    },
    {
      ""patientNumber"": 10,
      ""gender"": ""woman"",
      ""age"": 16,
      ""domicile"": ""Hunedoara"",
      ""infectionContact"": ""a calatorit cu pacientul 9"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": ""vindecat"",
      ""isCured"": true
    },
    {
      ""patientNumber"": 11,
      ""gender"": ""woman"",
      ""age"": 15,
      ""domicile"": ""Timisoara"",
      ""infectionContact"": ""contact cu tinerii depistati"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": ""Timisoara"",
      ""healthState"": ""vindecat"",
      ""isCured"": true
    },
    {
      ""patientNumber"": 12,
      ""gender"": ""man"",
      ""age"": 49,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""a calatorit in Italia"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": ""Bucuresti - primul caz"",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 13,
      ""gender"": ""man"",
      ""age"": 72,
      ""domicile"": ""Galati"",
      ""infectionContact"": ""a calatorit in Italia"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": ""Bucuresti"",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 14,
      ""gender"": ""woman"",
      ""age"": 42,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""contact barbat de 49 de ani nr 12"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 15,
      ""gender"": ""woman"",
      ""age"": 70,
      ""domicile"": ""Mures"",
      ""infectionContact"": ""a calatorit in Italia"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": ""Cluj"",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 16,
      ""gender"": ""woman"",
      ""age"": 73,
      ""domicile"": ""Buzau"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 17,
      ""gender"": ""man"",
      ""age"": 60,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""Gerota"",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 18,
      ""gender"": ""woman"",
      ""age"": 31,
      ""domicile"": ""Ilfov"",
      ""infectionContact"": ""contact cu prietena barbatului de 49 de ani, primul caz din Bucuresti, caz12"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 19,
      ""gender"": ""man"",
      ""age"": 32,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""contact pacient Gerota"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 20,
      ""gender"": ""woman"",
      ""age"": 30,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""contact pacient Gerota"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 21,
      ""gender"": ""man"",
      ""age"": 3,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""contact pacient Gerota"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 22,
      ""gender"": ""woman"",
      ""age"": 36,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""a calatorit in Israel"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 23,
      ""gender"": ""woman"",
      ""age"": 35,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""a calatorit in Israel"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 24,
      ""gender"": ""man"",
      ""age"": 34,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""a calatorit in UK"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 25,
      ""gender"": ""woman"",
      ""age"": 41,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""a calatorit in Germania"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 26,
      ""gender"": ""man"",
      ""age"": 37,
      ""domicile"": ""Resita"",
      ""infectionContact"": ""contact direct"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": ""internat Spital Resita"",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 27,
      ""gender"": ""woman"",
      ""age"": 26,
      ""domicile"": ""Hunedoara"",
      ""infectionContact"": ""contact direct"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": ""vindecat"",
      ""isCured"": true
    },
    {
      ""patientNumber"": 28,
      ""gender"": ""man"",
      ""age"": 57,
      ""domicile"": ""Arad"",
      ""infectionContact"": ""a calatorit in Italia"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 29,
      ""gender"": ""woman"",
      ""age"": 42,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""contact pacient Gerota"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 30,
      ""gender"": ""woman"",
      ""age"": 43,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""contact pacient Gerota"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 31,
      ""gender"": ""man"",
      ""age"": 42,
      ""domicile"": ""Iasi"",
      ""infectionContact"": ""a calatorit la Venetia"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 32,
      ""gender"": ""man"",
      ""age"": 32,
      ""domicile"": ""Iasi"",
      ""infectionContact"": ""contact caz confirmat Varsovia"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": ""politist de frontiera"",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 33,
      ""gender"": ""man"",
      ""age"": 55,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""contact Gerota"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 34,
      ""gender"": ""man"",
      ""age"": 31,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""aflat in autoizolare"",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 35,
      ""gender"": ""woman"",
      ""age"": 53,
      ""domicile"": ""Covasna"",
      ""infectionContact"": ""sosita din Italia, aflata in autoizolare"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 36,
      ""gender"": ""man"",
      ""age"": 56,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""a calatorit in Israel"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": ""stare grava ATI"",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 37,
      ""gender"": ""man"",
      ""age"": 47,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""a calatorit in Germania"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": ""Victor Babes"",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 38,
      ""gender"": ""woman"",
      ""age"": 54,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""contact pacient Gerota"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 39,
      ""gender"": ""man"",
      ""age"": 52,
      ""domicile"": ""Constanta"",
      ""infectionContact"": ""nu a calatorit/nu a intrat in contact, probabil lucreaza spital"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 40,
      ""gender"": ""man"",
      ""age"": 22,
      ""domicile"": ""carantinat Arad"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 41,
      ""gender"": ""man"",
      ""age"": 30,
      ""domicile"": ""carantinat Arad"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 42,
      ""gender"": ""man"",
      ""age"": 34,
      ""domicile"": ""carantinat Arad"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 43,
      ""gender"": ""man"",
      ""age"": 36,
      ""domicile"": ""carantinat Arad"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 44,
      ""gender"": ""man"",
      ""age"": 57,
      ""domicile"": ""carantinat Arad"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 45,
      ""gender"": ""man"",
      ""age"": 20,
      ""domicile"": ""Iasi"",
      ""infectionContact"": ""a calatorit in Italia"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 46,
      ""gender"": ""woman"",
      ""age"": 63,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""contact cu femeia de 35 de ani care a calatorit in Israel nr23"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 47,
      ""gender"": ""man"",
      ""age"": 48,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""contact direct cu fiul pacientului de la Gerota nr19"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 48,
      ""gender"": ""woman"",
      ""age"": 20,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""contact direct cu sofer pacient Gerota"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 49,
      ""gender"": ""woman"",
      ""age"": 45,
      ""domicile"": ""Cluj-carantinata Arad"",
      ""infectionContact"": ""sosita din Italia"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 50,
      ""gender"": ""woman"",
      ""age"": 54,
      ""domicile"": ""Neamt"",
      ""infectionContact"": ""a calatorit in Italia"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 51,
      ""gender"": ""man"",
      ""age"": 21,
      ""domicile"": ""Mures"",
      ""infectionContact"": ""a calatorit in Italia"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 52,
      ""gender"": ""woman"",
      ""age"": 33,
      ""domicile"": ""Cluj"",
      ""infectionContact"": ""lucreaza in Italia"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": ""Internat Cluj-Napoca"",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 53,
      ""gender"": ""man"",
      ""age"": 53,
      ""domicile"": ""Covasna"",
      ""infectionContact"": ""a calatorit in Italia"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 54,
      ""gender"": ""woman"",
      ""age"": 58,
      ""domicile"": ""Hunedoara"",
      ""infectionContact"": ""contact caz pozitiv"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 55,
      ""gender"": ""woman"",
      ""age"": 74,
      ""domicile"": ""Hunedoara"",
      ""infectionContact"": ""contact cu caz pozitiv"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 56,
      ""gender"": ""woman"",
      ""age"": 52,
      ""domicile"": ""Hunedoara"",
      ""infectionContact"": ""contact caz pozitiv"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 57,
      ""gender"": ""woman"",
      ""age"": 45,
      ""domicile"": ""Hunedoara"",
      ""infectionContact"": ""contact caz pozitiv"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 58,
      ""gender"": ""woman"",
      ""age"": 53,
      ""domicile"": ""Hunedoara"",
      ""infectionContact"": ""contact caz pozitiv"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 59,
      ""gender"": ""woman"",
      ""age"": 45,
      ""domicile"": ""Hunedoara"",
      ""infectionContact"": ""contact caz pozitiv"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 60,
      ""gender"": ""man"",
      ""age"": 39,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""contact cu persoana care a calatorit Germania"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 61,
      ""gender"": ""man"",
      ""age"": 53,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""coleg birou cu membru al familiei pacient Gerota"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 62,
      ""gender"": ""woman"",
      ""age"": 48,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""contact membru familie caz 61"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 63,
      ""gender"": ""woman"",
      ""age"": 22,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""contact membru familie caz 61"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 64,
      ""gender"": ""man"",
      ""age"": 22,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""contact membru familie caz 61"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 65,
      ""gender"": ""man"",
      ""age"": 57,
      ""domicile"": ""Constanta"",
      ""infectionContact"": ""Contact membru familie pacient nr 39"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": ""Spital JudeteanConstanta"",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 66,
      ""gender"": ""man"",
      ""age"": 51,
      ""domicile"": ""Constanta"",
      ""infectionContact"": ""Contact membru familie pacient nr 39"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": ""Spital JudeteanConstanta"",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 67,
      ""gender"": ""man"",
      ""age"": 34,
      ""domicile"": ""Constanta"",
      ""infectionContact"": ""Contact membru familie pacient nr 39"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": ""Spital JudeteanConstanta"",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 68,
      ""gender"": ""woman"",
      ""age"": 56,
      ""domicile"": ""Constanta"",
      ""infectionContact"": ""Contact membru familie pacient nr 39"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": ""Spital JudeteanConstanta"",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 69,
      ""gender"": ""man"",
      ""age"": 26,
      ""domicile"": ""Mehedinti"",
      ""infectionContact"": ""venit din Italia in data de 12.03 - Carantinat la Mehedinti"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 70,
      ""gender"": ""woman"",
      ""age"": 52,
      ""domicile"": ""Mehedinti"",
      ""infectionContact"": ""Contact membru familiepacient nr69 - mama, venita si ea din Italia in 12.03 - Carantinata la Mehedinti"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 71,
      ""gender"": ""woman"",
      ""age"": 40,
      ""domicile"": ""carantinata Timisoara"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 72,
      ""gender"": ""woman"",
      ""age"": 50,
      ""domicile"": ""carantinata Timisoara"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 73,
      ""gender"": ""woman"",
      ""age"": 33,
      ""domicile"": ""Timis"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 74,
      ""gender"": ""man"",
      ""age"": 50,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""medic, manager spital"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 75,
      ""gender"": ""man"",
      ""age"": 62,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""pacient contactul cu medicul gastroenterolog - caz30"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 76,
      ""gender"": ""man"",
      ""age"": 44,
      ""domicile"": ""Brasov"",
      ""infectionContact"": ""venit din Boston pe 11.03, internat pe 12.03 cu simptome"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 77,
      ""gender"": ""woman"",
      ""age"": 16,
      ""domicile"": ""Covasna"",
      ""infectionContact"": ""contact cu persoana pozitiva"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 78,
      ""gender"": ""woman"",
      ""age"": 77,
      ""domicile"": ""Covasna"",
      ""infectionContact"": ""contact cu o familievenita din Italia"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 79,
      ""gender"": ""woman"",
      ""age"": 51,
      ""domicile"": ""Brasov"",
      ""infectionContact"": ""venita din Italia - carantinata"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 80,
      ""gender"": ""man"",
      ""age"": 26,
      ""domicile"": ""Prahova"",
      ""infectionContact"": ""venit din Italia 12.03, carantinat in aceeasi zi la Busteni, confirmat pe 13.03 de INBI Bals"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 81,
      ""gender"": ""woman"",
      ""age"": 26,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""in izolare din 09.03"",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": ""Victor Babes"",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 82,
      ""gender"": ""man"",
      ""age"": 20,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""Venit din Marea Britanie in data de 12.03. internat din 13.03"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": ""Bals"",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 83,
      ""gender"": ""man"",
      ""age"": 32,
      ""domicile"": ""Timisoara"",
      ""infectionContact"": ""venit din Italia 12.03, carantinat"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 84,
      ""gender"": ""woman"",
      ""age"": 41,
      ""domicile"": ""Timisoara"",
      ""infectionContact"": ""venit din Italia 12.03, carantinat"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 85,
      ""gender"": ""woman"",
      ""age"": 33,
      ""domicile"": ""Timisoara"",
      ""infectionContact"": ""venit din Italia 11.03, carantinata la Lugoj"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 86,
      ""gender"": ""man"",
      ""age"": 36,
      ""domicile"": ""Timisoara"",
      ""infectionContact"": ""venit din Italia 11.03, carantinata la Lugoj"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 87,
      ""gender"": ""woman"",
      ""age"": 32,
      ""domicile"": ""Caras-Severin"",
      ""infectionContact"": ""venit din Italia 10.03, carantinata la Caransebes"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 88,
      ""gender"": ""man"",
      ""age"": 45,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""venit din Londra 09.03, s-a prezentat azi cu frisoane si febra"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": ""Victor Basbes"",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 89,
      ""gender"": ""woman"",
      ""age"": 49,
      ""domicile"": ""Bihor"",
      ""infectionContact"": ""venita din Italia"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 90,
      ""gender"": ""woman"",
      ""age"": 64,
      ""domicile"": ""Neamt"",
      ""infectionContact"": ""venita din Italia"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 91,
      ""gender"": ""man"",
      ""age"": 1,
      ""domicile"": ""Bacau"",
      ""infectionContact"": ""contact matusa venita din Italia"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 92,
      ""gender"": ""woman"",
      ""age"": 41,
      ""domicile"": ""Iasi"",
      ""infectionContact"": ""venita din Dubai, lucreaza in Ministerul Sanatatii"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 93,
      ""gender"": ""woman"",
      ""age"": 41,
      ""domicile"": ""Iasi"",
      ""infectionContact"": ""venita din Franta"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 94,
      ""gender"": ""woman"",
      ""age"": 27,
      ""domicile"": ""Caras-Severin"",
      ""infectionContact"": ""venita din Italia"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": ""carantina Caras-Severin"",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 95,
      ""gender"": ""man"",
      ""age"": 55,
      ""domicile"": ""Caras-Severin"",
      ""infectionContact"": ""venit din Italia"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": ""carantina Caras-Severin"",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 96,
      ""gender"": ""woman"",
      ""age"": 47,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""contact caz 45, era in autoizolare"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 97,
      ""gender"": ""man"",
      ""age"": 39,
      ""domicile"": ""Dolj"",
      ""infectionContact"": ""venit din Italia"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": ""Craiova"",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 98,
      ""gender"": ""woman"",
      ""age"": 53,
      ""domicile"": ""Constanta"",
      ""infectionContact"": ""a calatorit in Germania si Austria, test lucrat in reteaua privata"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 99,
      ""gender"": ""man"",
      ""age"": 54,
      ""domicile"": ""Constanta"",
      ""infectionContact"": ""sot caz 98, test lucrat in reteaua privata, intors de la Viena"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 100,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Hunedoara"",
      ""infectionContact"": ""contact senator"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 101,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Hunedoara"",
      ""infectionContact"": ""contact senator"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 102,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Hunedoara"",
      ""infectionContact"": ""contact senator"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 103,
      ""gender"": ""man"",
      ""age"": 51,
      ""domicile"": ""Brasov"",
      ""infectionContact"": ""venit din Italia, aflat in carantina"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 104,
      ""gender"": ""man"",
      ""age"": 19,
      ""domicile"": ""Hunedoara"",
      ""infectionContact"": ""contact al cazului 59"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 105,
      ""gender"": ""man"",
      ""age"": 4,
      ""domicile"": ""Hunedoara"",
      ""infectionContact"": ""contact al cazului 59"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 106,
      ""gender"": ""woman"",
      ""age"": 43,
      ""domicile"": ""Hunedoara"",
      ""infectionContact"": ""contact al cazului 26"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 107,
      ""gender"": ""woman"",
      ""age"": 44,
      ""domicile"": ""Hunedoara"",
      ""infectionContact"": ""contact al cazului 26"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 108,
      ""gender"": ""woman"",
      ""age"": 41,
      ""domicile"": ""Hunedoara"",
      ""infectionContact"": ""contact al cazului 26"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 109,
      ""gender"": ""man"",
      ""age"": 55,
      ""domicile"": ""Timisoara"",
      ""infectionContact"": ""aflat in carantina"",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 110,
      ""gender"": ""man"",
      ""age"": 31,
      ""domicile"": ""Constanta"",
      ""infectionContact"": ""contact caz 67 si 68  (senator)"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 111,
      ""gender"": ""woman"",
      ""age"": 53,
      ""domicile"": ""Brasov"",
      ""infectionContact"": ""contact caz 76 (venit din Boston)"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 112,
      ""gender"": ""woman"",
      ""age"": 33,
      ""domicile"": ""Timisoara"",
      ""infectionContact"": ""venita din Italia, in carantina in Timisoara"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 113,
      ""gender"": ""man"",
      ""age"": 36,
      ""domicile"": ""Timisoara"",
      ""infectionContact"": ""venit din Italia, aflat in carantina Timisoara"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 114,
      ""gender"": ""woman"",
      ""age"": 38,
      ""domicile"": ""Hunedoara"",
      ""infectionContact"": ""contact caz 26- asistenta medicala"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 115,
      ""gender"": ""woman"",
      ""age"": 45,
      ""domicile"": ""Hunedoara"",
      ""infectionContact"": ""contact caz 26- asistenta medicala"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 116,
      ""gender"": ""man"",
      ""age"": 60,
      ""domicile"": ""Caras-Severin"",
      ""infectionContact"": ""venit din Italia in 11.03, aflat in carantina la Resita"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 117,
      ""gender"": ""woman"",
      ""age"": 43,
      ""domicile"": ""Vaslui"",
      ""infectionContact"": ""venita din Italia, carantina Arad"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": ""boli infectioase Timisoara"",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 118,
      ""gender"": ""woman"",
      ""age"": 33,
      ""domicile"": ""Constanta"",
      ""infectionContact"": ""contact caz 67 (senator)"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 119,
      ""gender"": ""woman"",
      ""age"": 25,
      ""domicile"": ""Cluj Napoca"",
      ""infectionContact"": ""venita din Berlin in 11.03"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 120,
      ""gender"": ""man"",
      ""age"": 46,
      ""domicile"": ""Satu Mare"",
      ""infectionContact"": ""venit din Italia, 11.03, in carantina la Satu Mare"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 121,
      ""gender"": ""man"",
      ""age"": 37,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""intors din Norvegia in 13.03"",
      ""infectionSourceType"": ""extern"",
      ""hospitalizationLocation"": ""V Babes"",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 122,
      ""gender"": ""woman"",
      ""age"": 58,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""asistent mediacl Gerota, contact caz 30"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 123,
      ""gender"": ""man"",
      ""age"": 24,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": ""inginer horticol, ADP S 4, contact caz 16"",
      ""infectionSourceType"": ""intern"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 124,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 125,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 126,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 127,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 128,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Arad"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 129,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Arad"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 130,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Arad"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 131,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Arad"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 132,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Brasov"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 133,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Brasov"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 134,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Brasov"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 135,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Braila"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 136,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Braila"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 137,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Constanta"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 138,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Teleorman"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 139,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Iasi"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 140,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Arad"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 141,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Arad"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 142,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Arad"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 143,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Arad"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 144,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Ilfov"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 145,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Ilfov"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 146,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Ilfov"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 147,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Valcea"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 148,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Valcea"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 149,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Timisoara"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 150,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Timisoara"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 151,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 152,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Cluj Napoca"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 153,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Salaj"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 154,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Buzau"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 155,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Ialomita"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 156,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Hunedoara"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 157,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Galati"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 158,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Suceava"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 159,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 160,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 161,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 162,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Bucuresti"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 163,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Ilfov"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 164,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Ilfov"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 165,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Constanta"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 166,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Teleorman"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 167,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Neamt"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 168,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Mures"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 169,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Iasi"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 170,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Iasi"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 171,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Iasi"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 172,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Iasi"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 173,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Iasi"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 174,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Iasi"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 175,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Iasi"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 176,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Suceava"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 177,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Suceava"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 178,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Neamt"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 179,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Neamt"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 180,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Ialomita"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 181,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Mures"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 182,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Botosani"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 183,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Bistrita Nasaud"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    },
    {
      ""patientNumber"": 184,
      ""gender"": ""man"",
      ""age"": null,
      ""domicile"": ""Vrancea"",
      ""infectionContact"": """",
      ""infectionSourceType"": ""unknown"",
      ""hospitalizationLocation"": """",
      ""healthState"": """",
      ""isCured"": false
    }
  ],
  ""countiesData"": [
    {
      ""county"": ""Bucuresti"",
      ""numberOfInfections"": 45
    },
    {
      ""county"": ""Hunedoara"",
      ""numberOfInfections"": 20
    },
    {
      ""county"": ""Arad"",
      ""numberOfInfections"": 14
    },
    {
      ""county"": ""Timisoara"",
      ""numberOfInfections"": 17
    },
    {
      ""county"": ""Constanta"",
      ""numberOfInfections"": 11
    },
    {
      ""county"": ""Iasi"",
      ""numberOfInfections"": 13
    },
    {
      ""county"": ""Covasna"",
      ""numberOfInfections"": 4
    },
    {
      ""county"": ""Mures"",
      ""numberOfInfections"": 3
    },
    {
      ""county"": ""Cluj"",
      ""numberOfInfections"": 4
    },
    {
      ""county"": ""Mehedinti"",
      ""numberOfInfections"": 2
    },
    {
      ""county"": ""Suceava"",
      ""numberOfInfections"": 4
    },
    {
      ""county"": ""Gorj"",
      ""numberOfInfections"": 1
    },
    {
      ""county"": ""Olt"",
      ""numberOfInfections"": 1
    },
    {
      ""county"": ""Ilfov"",
      ""numberOfInfections"": 6
    },
    {
      ""county"": ""Galati"",
      ""numberOfInfections"": 2
    },
    {
      ""county"": ""Maramures"",
      ""numberOfInfections"": 1
    },
    {
      ""county"": ""Caras Severin"",
      ""numberOfInfections"": 4
    },
    {
      ""county"": ""Buzau"",
      ""numberOfInfections"": 2
    },
    {
      ""county"": ""Neamt"",
      ""numberOfInfections"": 5
    },
    {
      ""county"": ""Brasov"",
      ""numberOfInfections"": 7
    },
    {
      ""county"": ""Prahova"",
      ""numberOfInfections"": 1
    },
    {
      ""county"": ""Bihor"",
      ""numberOfInfections"": 1
    },
    {
      ""county"": ""Bacau"",
      ""numberOfInfections"": 1
    },
    {
      ""county"": ""Dolj"",
      ""numberOfInfections"": 1
    },
    {
      ""county"": ""Vaslui"",
      ""numberOfInfections"": 1
    },
    {
      ""county"": ""Satu Mare"",
      ""numberOfInfections"": 1
    },
    {
      ""county"": ""Braila"",
      ""numberOfInfections"": 2
    },
    {
      ""county"": ""Teleorman"",
      ""numberOfInfections"": 2
    },
    {
      ""county"": ""Valcea"",
      ""numberOfInfections"": 2
    },
    {
      ""county"": ""Salaj"",
      ""numberOfInfections"": 1
    },
    {
      ""county"": ""Ialomita"",
      ""numberOfInfections"": 2
    },
    {
      ""county"": ""Botosani"",
      ""numberOfInfections"": 1
    },
    {
      ""county"": ""Bistrita Nasaud"",
      ""numberOfInfections"": 1
    },
    {
      ""county"": ""Vrancea"",
      ""numberOfInfections"": 1
    }
  ]
}

       ";
       
        #endregion
    }
}