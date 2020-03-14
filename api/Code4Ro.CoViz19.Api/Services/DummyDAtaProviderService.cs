using Code4Ro.CoViz19.Models;
using System.Threading.Tasks;
using Newtonsoft.Json;
namespace Code4Ro.CoViz19.Api.Services
{
    public class DummyDAtaProviderService : IDataProviderService
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
              ""numberDiagnosed"": null,
              ""numberCured"": null,
              ""numberQuarantined"": null,
              ""numberMonitoredAtHome"": null,
              ""emergencyCalls"": null,
              ""hotLineCalls"": null,
              ""numberCriminalCases"": null,
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
              ""hospitalizationLocation"": ""Timisoara"",
              ""healthState"": """",
              ""isCured"": false
            },
            {
              ""patientNumber"": 10,
              ""gender"": ""woman"",
              ""age"": 16,
              ""domicile"": ""Hunedoara"",
              ""infectionContact"": ""a calatorit cu pacientul 9"",
              ""hospitalizationLocation"": """",
              ""healthState"": """",
              ""isCured"": false
            },
            {
              ""patientNumber"": 11,
              ""gender"": ""woman"",
              ""age"": 15,
              ""domicile"": ""Timisoara"",
              ""infectionContact"": ""contact cu tinerii depistati"",
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
              ""hospitalizationLocation"": """",
              ""healthState"": """",
              ""isCured"": false
            },
            {
              ""patientNumber"": 18,
              ""gender"": ""woman"",
              ""age"": 31,
              ""domicile"": ""judetul Ilfov"",
              ""infectionContact"": ""contact cu prietena barbatului de 49 de ani, primul caz din Bucuresti, caz12"",
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
              ""hospitalizationLocation"": """",
              ""healthState"": """",
              ""isCured"": false
            },
            {
              ""patientNumber"": 28,
              ""gender"": ""man"",
              ""age"": 57,
              ""domicile"": ""Arad"",
              ""infectionContact"": ""a calatorit in Italia"",
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
              ""hospitalizationLocation"": ""Spital JudeteanConstanta"",
              ""healthState"": """",
              ""isCured"": false
            },
            {
              ""patientNumber"": 66,
              ""gender"": ""man"",
              ""age"": 51,
              ""domicile"": ""Constanta"",
              ""infectionContact"": ""Contact membru familie pacient nr 40"",
              ""hospitalizationLocation"": ""Spital JudeteanConstanta"",
              ""healthState"": """",
              ""isCured"": false
            },
            {
              ""patientNumber"": 67,
              ""gender"": ""man"",
              ""age"": 34,
              ""domicile"": ""Constanta"",
              ""infectionContact"": ""Contact membru familie pacient nr 41"",
              ""hospitalizationLocation"": ""Spital JudeteanConstanta"",
              ""healthState"": """",
              ""isCured"": false
            },
            {
              ""patientNumber"": 68,
              ""gender"": ""woman"",
              ""age"": 56,
              ""domicile"": ""Constanta"",
              ""infectionContact"": ""Contact membru familie pacient nr 42"",
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
              ""hospitalizationLocation"": """",
              ""healthState"": """",
              ""isCured"": false
            }
          ],
          ""countiesData"": [
            {
              ""county"": ""Bucuresti"",
              ""numberOfInfections"": 25
            },
            {
              ""county"": ""Hunedoara"",        
              ""numberOfInfections"": 9
            },
            {
              ""county"": ""Arad"",
              ""numberOfInfections"": 6
            },
            {
              ""county"": ""Timisoara"",
              ""numberOfInfections"": 8
            },
            {
              ""county"": ""Constanta"",
              ""numberOfInfections"": 5
            },
            {
              ""county"": ""Iasi"",
              ""numberOfInfections"": 3
            },
            {
              ""county"": ""Covasna"",
              ""numberOfInfections"": 2
            },
            {
              ""county"": ""Mures"",
              ""numberOfInfections"": 2
            },
            {
              ""county"": ""Cluj"",
              ""numberOfInfections"": 2
            },
            {
              ""county"": ""Mehedinti"",
              ""numberOfInfections"": 2
            },
            {
              ""county"": ""Suceava"",
              ""numberOfInfections"": 1
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
              ""numberOfInfections"": 1
            },
            {
              ""county"": ""Galati"",
              ""numberOfInfections"": 1
            },
            {
              ""county"": ""Maramures"",
              ""numberOfInfections"": 1
            },
            {
              ""county"": ""Caras Severin"",
              ""numberOfInfections"": 1
            },
            {
              ""county"": ""Buzau"",
              ""numberOfInfections"": 1
            },
            {
              ""county"": ""Neamt"",
              ""numberOfInfections"": 1
            }
          ]
        }

";
        #endregion
    }
}