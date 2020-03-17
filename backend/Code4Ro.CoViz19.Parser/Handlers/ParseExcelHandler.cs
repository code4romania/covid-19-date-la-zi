using Code4Ro.CoViz19.Parser.Commands;
using CSharpFunctionalExtensions;
using ExcelDataReader;
using MediatR;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using Code4Ro.CoViz19.Models;
using Code4Ro.CoViz19.Parser.Parsers;


namespace Code4Ro.CoViz19.Parser.Handlers
{
    public class ParseExcelHandler : IRequestHandler<ParseExcelCommand, Result<ParsedDataModel>>
    {
        public async Task<Result<ParsedDataModel>> Handle(ParseExcelCommand request, CancellationToken cancellationToken)
        {
            DataSet result;

            await Task.FromResult(true);

            try
            {
                using (var stream = request.File.OpenReadStream())
                {
                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {
                        result = reader.AsDataSet();
                    }
                }
            }
            catch (Exception ex)
            {
                return Result.Failure<ParsedDataModel>("Upload Failed, could not read the file. " + ex.Message);
            }

            if (result == null || result.Tables == null)
            {
                return Result.Failure<ParsedDataModel>("Upload Failed, could not read the file.");
            }

            var liveData = ParseLiveData(result.Tables[0]);
            var patiens = ParsePatiens(result.Tables[1]);
            var countiesData = ParseCountiesData(result.Tables[2]);
            var parsedData = new ParsedDataModel()
            {
                LiveUpdateData = liveData.IsSuccess ? liveData.Value : null,
                PatientsInfo = patiens.IsSuccess ? patiens.Value : null,
                CountiesData = countiesData.IsSuccess ? countiesData.Value : null
            };

            return Result.Ok(parsedData);
        }

        private Result<PatientInfo[]> ParsePatiens(DataTable patientsInfo)
        {
            if (patientsInfo == null)
            {
                return Result.Failure<PatientInfo[]>("Upload Failed, Live data table is empty");
            }

            var colCount = patientsInfo.Columns.Count;

            if (colCount < 7)
            {
                return Result.Failure<PatientInfo[]>("Upload Failed, live data col count");
            }
            var rowCount = patientsInfo.Rows.Count;
            if (rowCount < 1)
            {
                return Result.Failure<PatientInfo[]>("Upload Failed, live data row count");
            }

            var parsedPatientsInfo = new List<PatientInfo>();

            for (int index = 1; index < patientsInfo.Rows.Count; index++)
            {
                DataRow row = patientsInfo.Rows[index];
                var parsedRow = ParsePatientInfo(row, index);
                if (parsedRow == null)
                {
                    continue;
                }

                parsedPatientsInfo.Add(parsedRow);
            }
            return Result.Ok(parsedPatientsInfo.ToArray());
        }

        private PatientInfo ParsePatientInfo(DataRow row, int rowIndex)
        {
            bool hasAtLeastOneFieldsFilled = false;
            for (int i = 0; i <= 6; i++)
            {
                if (!DBNull.Value.Equals(row[i]))
                {
                    hasAtLeastOneFieldsFilled = true;
                }
            }

            if (!hasAtLeastOneFieldsFilled)
            {
                return null;
            }

            var patientNumber = ParseInt(row[0]) ?? rowIndex;
            var gender = ParseGender(row[1]);
            var age = ParseAge(row[2]);
            var domicile = ToSafeText(row[3]);
            var infectionContact = ToSafeText(row[4]);
            var hospitalizationLocation = ToSafeText(row[5]);
            (bool isCured, string healthObservation) = ParseHealthSate(row[6]);

            return new PatientInfo
            {
                PatientNumber = patientNumber,
                Gender = gender,
                Domicile = domicile,
                InfectionContact = infectionContact,
                InfectionSourceType = InfectionSourceParser.Parse(infectionContact),
                Age = age,
                HospitalizationLocation = hospitalizationLocation,
                HealthState = healthObservation,
                IsCured = isCured
            };
        }

        private (bool isCured, string healthObservation) ParseHealthSate(object value)
        {
            string state = ToSafeText(value);

            if (string.IsNullOrEmpty(state))
            {
                return (false, string.Empty);
            }

            if (state.Equals("vindecat", StringComparison.InvariantCultureIgnoreCase))
            {
                return (true, state);
            }

            return (false, state);
        }

        private int? ParseAge(object value)
        {
            string ageInfo = ToSafeText(value);
            int? age = null;
            if (string.IsNullOrEmpty(ageInfo))
            {
                return age;
            }
            ageInfo
                .Replace("de ani", string.Empty, StringComparison.InvariantCultureIgnoreCase)
                .Replace("ani", string.Empty, StringComparison.InvariantCultureIgnoreCase);

            if (ageInfo.Length == 2)
            {
                if (int.TryParse(ageInfo, out _) == false)
                {
                    return age;
                }

                return int.Parse(ageInfo);
            }

            string ageValue = ageInfo.Substring(0, 2).Trim();
            if (int.TryParse(ageValue, out _) == false)
            {
                return null;
            }

            return int.Parse(ageValue);

        }

        private Gender ParseGender(object value)
        {
            string gender = ToSafeText(value).ToLower();

            if (gender.StartsWith("f", StringComparison.InvariantCultureIgnoreCase))
            {
                return Gender.Woman;
            }

            return Gender.Man;
        }

        private Result<CountyInfectionsInfo[]> ParseCountiesData(DataTable countiesData)
        {
            if (countiesData == null)
            {
                return Result.Failure<CountyInfectionsInfo[]>("Upload Failed, counties data table is empty");
            }

            var colCount = countiesData.Columns.Count;

            if (colCount < 2)
            {
                return Result.Failure<CountyInfectionsInfo[]>("Upload Failed, counties data col count");
            }
            var rowCount = countiesData.Rows.Count;
            if (rowCount < 1)
            {
                return Result.Failure<CountyInfectionsInfo[]>("Upload Failed, counties data row count");
            }

            var parsedCountiesInfectionCases = new List<CountyInfectionsInfo>();

            for (int index = 1; index < countiesData.Rows.Count; index++)
            {
                DataRow row = countiesData.Rows[index];

                var parsedRow = new CountyInfectionsInfo()
                {
                    County = ToSafeText(row[0]),
                    NumberOfInfections = ParseInt(row[1])
                };

                if (string.IsNullOrEmpty(parsedRow.County))
                {
                    continue;
                }

                parsedCountiesInfectionCases.Add(parsedRow);
            }

            return Result.Ok(parsedCountiesInfectionCases.ToArray());
        }

        private Result<LiveUpdateData[]> ParseLiveData(DataTable liveData)
        {
            if (liveData == null)
            {
                return Result.Failure<LiveUpdateData[]>("Upload Failed, Live data table is empty");
            }

            var colCount = liveData.Columns.Count;

            if (colCount < 10)
            {
                return Result.Failure<LiveUpdateData[]>("Upload Failed, live data col count");
            }
            var rowCount = liveData.Rows.Count;
            if (rowCount < 1)
            {
                return Result.Failure<LiveUpdateData[]>("Upload Failed, live data row count");
            }

            var parsedLiveData = new List<LiveUpdateData>();
            string gruppedRowDate = string.Empty;
            for (int index = 1; index < liveData.Rows.Count; index++)
            {
                DataRow row = liveData.Rows[index];
                if (!DBNull.Value.Equals(row[0]))
                {
                    gruppedRowDate = ToSafeText(row[0]);
                }
                var parsedRow = ParseLiveUpsdateDataRow(row, gruppedRowDate);
                if (parsedRow != null)
                {

                    parsedLiveData.Add(parsedRow);
                }
            }

            var latestDataPerDay = parsedLiveData
                   .Select(x => new { key = x.Timestamp.ToShortDateString(), data = x })
                   .GroupBy(x => x.key, x => x.data, (key, rows) => rows.OrderByDescending(x => x.Timestamp).FirstOrDefault());

            return Result.Ok(latestDataPerDay.ToArray());
        }

        private LiveUpdateData ParseLiveUpsdateDataRow(DataRow row, string gruppedRowDate)
        {
            var dayMonth = gruppedRowDate.Trim().Split(".");
            int? hour = ParseInt(row[1]);
            var day = int.Parse(dayMonth[0]);
            var month = int.Parse(dayMonth[1]);
            var timestamp = new DateTime(2020, month, day, hour ?? 0, 0, 0);

            bool hasAtLeastOneFieldsFilled = false;
            for (int i = 2; i <= 10; i++)
            {
                if (!DBNull.Value.Equals(row[i]))
                {
                    hasAtLeastOneFieldsFilled = true;
                }
            }

            if (!hasAtLeastOneFieldsFilled)
            {
                return null;
            }
            return new LiveUpdateData()
            {
                Timestamp = timestamp,
                NumberDiagnosed = ParseInt(row[2]),
                NumberCured = ParseInt(row[3]),
                NumberQuarantined = ParseInt(row[4]),
                NumberMonitoredAtHome = ParseInt(row[5]),
                EmergencyCalls = ParseInt(row[6]),
                HotLineCalls = ParseInt(row[7]),
                NumberCriminalCases = ParseInt(row[8]),
                ProbesAnalyzed = ParseInt(row[9]),
                ProbesInAnalysis = ParseInt(row[10])
            };

        }

        private int? ParseInt(object value)
        {
            if (!DBNull.Value.Equals(value))
            {
                int returnValue = 0;

                if (value is decimal)
                {
                    returnValue = (int)value;
                }

                if (value is double)
                {
                    returnValue = Convert.ToInt32(value);
                }

                if (value is float)
                {
                    returnValue = Convert.ToInt32(value);
                }

                if (value is int)
                {
                    returnValue = Convert.ToInt32(value);
                }

                if (value is string)
                {
                    if (int.TryParse(ToSafeText(value), out returnValue) == false)
                    {
                        return null;
                    }
                }

                return returnValue;
            }

            return null;
        }

        private static string ToSafeText(object value)
        {
            if (value == null)
            {
                return string.Empty;
            }

            var text = value.ToString();

            if (string.IsNullOrWhiteSpace(text))
            {
                return string.Empty;
            }

            return NormalizeText(text.Trim());
        }

        private static string NormalizeText(string input)
        {
            string normalized = input.Normalize(NormalizationForm.FormKD);
            Encoding removal = Encoding.GetEncoding(Encoding.ASCII.CodePage,
                                                    new EncoderReplacementFallback(""),
                                                    new DecoderReplacementFallback(""));
            byte[] bytes = removal.GetBytes(normalized);
            return Encoding.ASCII.GetString(bytes);
        }
    }
}
