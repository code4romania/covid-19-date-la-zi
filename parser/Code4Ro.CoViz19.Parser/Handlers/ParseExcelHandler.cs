using Code4Ro.CoViz19.Parser.Commands;
using Code4Ro.CoViz19.Parser.Models;
using CSharpFunctionalExtensions;
using ExcelDataReader;
using MediatR;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

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
            ///  var patiens = ParsePatiens(result.Tables[1]);
            //  var countiesData = ParseCountiesData(result.Tables[2]);
            var parsedData = new ParsedDataModel()
            {
                LiveUpdateData = liveData.IsSuccess ? liveData.Value : null
            };

            return Result.Ok(parsedData);
        }

        private object ParsePatiens(DataTable dataTable)
        {
            throw new NotImplementedException();
        }

        private object ParseCountiesData(DataTable dataTable)
        {
            throw new NotImplementedException();
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
                parsedLiveData.Add(parsedRow);
            }
            return Result.Ok(parsedLiveData.ToArray());
        }

        private LiveUpdateData ParseLiveUpsdateDataRow(DataRow row, string gruppedRowDate)
        {
            var dayMonth = gruppedRowDate.Trim().Split(".");
            int? hour = ParseInt(row[1]);
            var day = int.Parse(dayMonth[0]);
            var month = int.Parse(dayMonth[1]);
            var timestamp = new DateTime(2020, month, day, hour ?? 0, 0, 0);

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


        // TODO: change parsing (maybe) for invalid entries ?
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
                    int.TryParse(ToSafeText(value), out returnValue);
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

            return text;

        }
    }
}
/*
    public class EmployeeUploadFileHandler 
    {
        public EmployeeUploadResponseDto Handle(IFormFile file)
        {
           
        }

        private EmployeeDto ParseEmployee(
            object geboortedatumObject,
            object geslachtObject,
            object uniformJaarloonObject,
            object dienstverbandObject,
            out string message)
        {
            message = string.Empty;

            var geboortedatum = ParseGeboortedatum(geboortedatumObject, ref message);
            var geslacht = ParseGeslacht(geslachtObject, ref message);
            var uniformJaarloon = ParseUniformJaarloon(uniformJaarloonObject, ref message);
            var dienstverband = ParseDienstverband(dienstverbandObject, ref message);

            if (string.IsNullOrEmpty(message) &&
                geslacht == null &&
                geboortedatum == null &&
                uniformJaarloon == null &&
                dienstverband == null)
            {
                return null;
            }

            if (geboortedatum == null)
            {
                message += "geen geboortedatum informatie;";
                return null;
            }

            if (geslacht == null)
            {
                message += "geen geslacht informatie;";
                return null;
            }

            if (uniformJaarloon == null)
            {
                message += "geen uniformJaarloon informatie;";
                return null;
            }

            if (dienstverband == null)
            {
                message += "geen verzekerd dienstverband informatie;";
                return null;
            }

            return new EmployeeDto
            {
                Geslacht = geslacht.Value,
                Geboortedatum = geboortedatum.Value,
                UniformJaarloon = uniformJaarloon.Value,
                Dienstverband = dienstverband.Value
            };
        }

        private DienstverbandType? ParseDienstverband(object dienstverbandObject, ref string parseMessage)
        {
            if (DBNull.Value.Equals(dienstverbandObject))
            {
                return null;
            }

            var dienstverbandText = ToSafeText(dienstverbandObject);
            if (!string.IsNullOrWhiteSpace(dienstverbandText))
            {
                if (TryParseEnum<DienstverbandType>(dienstverbandText, out var dienstverbandValue))
                {
                    return dienstverbandValue;
                }

                if (dienstverbandText.ToUpper() == "V")
                {
                    return DienstverbandType.Vast;
                }

                if (dienstverbandText.ToUpper() == "T")
                {
                    return DienstverbandType.Tijdelijk;
                }

                parseMessage += "ongeldig dienstverband waarde; ";
            }
            else
            {
                parseMessage += "ongeldig dienstverband type;";
            }

            return null;
        }

        private decimal? ParseUniformJaarloon(object uniformJaarloonObject, ref string parseMessage)
        {
            if (!DBNull.Value.Equals(uniformJaarloonObject))
            {
                decimal value = 0;

                if (uniformJaarloonObject is decimal)
                {
                    value = (decimal)uniformJaarloonObject;
                }

                if (uniformJaarloonObject is double)
                {
                    value = Convert.ToInt(uniformJaarloonObject);
                }

                if (uniformJaarloonObject is float)
                {
                    value = Convert.ToInt(uniformJaarloonObject);
                }

                if (uniformJaarloonObject is int)
                {
                    value = Convert.ToInt(uniformJaarloonObject);
                }

                if (value < (decimal)Math.Pow(10, 15))
                {
                    return value;
                }
            }

            parseMessage += "ongeldig uniformJaarloon type;";

            return null;
        }

        private DateTime? ParseGeboortedatum(object geboortedatumObject, ref string parseMessage)
        {
            if (!DBNull.Value.Equals(geboortedatumObject))
            {
                if (geboortedatumObject is DateTime time)
                {
                    return time;
                }

                parseMessage += "ongeldig geboortedatum type;";
            }

            return null;
        }

        private GeslachtType? ParseGeslacht(object geslachtObject, ref string parseMessage)
        {
            if (!DBNull.Value.Equals(geslachtObject))
            {
                var geslachtText = ToSafeText(geslachtObject);
                if (!string.IsNullOrWhiteSpace(geslachtText))
                {
                    if (TryParseEnum<GeslachtType>(geslachtText, out var geslachtValue))
                    {
                        return geslachtValue;
                    }

                    if (geslachtText.ToUpper() == "M")
                    {
                        return GeslachtType.Man;
                    }

                    if (geslachtText.ToUpper() == "V")
                    {
                        return GeslachtType.Vrouw;
                    }

                    parseMessage += "ongeldig geslacht waarde;";
                }
                else
                {
                    parseMessage += "ongeldig geslacht type;";
                }
            }

            return null;
        }

        private static bool TryParseEnum<T>(string text, out T result)
        {
            var enumType = typeof(T);
            foreach (var name in Enum.GetNames(enumType))
            {
                var enumMemberAttributes = ((EnumMemberAttribute[])enumType.GetField(name).GetCustomAttributes(typeof(EnumMemberAttribute), true));
                foreach (var enumMemberAttribute in enumMemberAttributes)
                {
                    if (enumMemberAttribute != null && String.Compare(enumMemberAttribute.Value, text, StringComparison.OrdinalIgnoreCase) == 0)
                    {
                        result = (T)Enum.Parse(enumType, name);
                        return true;
                    }
                }
            }

            if (Enum.TryParse(enumType, text, true, out var enumValue))
            {
                result = (T)enumValue;
                return true;
            }

            result = default;

            return false;
        }

        private static string ToSafeText(object value)
        {
            if (value == null)
            {
                return null;
            }

            var text = value.ToString();
            if (text.Length > 255)
            {
                return null;
            }

            if (string.IsNullOrWhiteSpace(text))
            {
                return null;
            }

            return text;

        }
    }

}


*/
