using Code4Ro.CoViz19.Parser.Commands;
using CSharpFunctionalExtensions;
using ExcelDataReader;
using MediatR;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Code4Ro.CoViz19.Models;
using Code4Ro.CoViz19.Parser.Parsers;

namespace Code4Ro.CoViz19.Parser.Handlers
{
    public class ParseV2ExcelHandler : IRequestHandler<ParseV2ExcelCommand, Result<ParsedDataModel>>
    {
        public async Task<Result<ParsedDataModel>> Handle(ParseV2ExcelCommand request, CancellationToken cancellationToken)
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

            var patiens = ParsePatiens(result.Tables[0]);
            var parsedData = new ParsedDataModel()
            {
                PatientsInfo = patiens.IsSuccess ? patiens.Value : null,
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

            for (int index = 4; index < patientsInfo.Rows.Count; index++)
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
            var gender = GenderParser.Parse(TextNormalizer.ToSafeText(row[1]));
            var age = AgeParser.Parse(TextNormalizer.ToSafeText(row[2]));

            var domicile = TextNormalizer.ToSafeText(row[3]);
            var infectionContact = TextNormalizer.ToSafeText(row[4]);
            var confirmedOn = DateParser.Parse(TextNormalizer.ToSafeText(row[5]));

            return new PatientInfo
            {
                PatientNumber = patientNumber,
                Gender = gender,
                Domicile = domicile.ToUpper(),
                InfectionContact = infectionContact,
                InfectionSourceType = InfectionSourceParser.Parse(infectionContact),
                Age = age,
                ConfirmedOn = confirmedOn
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
                    if (int.TryParse(TextNormalizer.ToSafeText(value), out returnValue) == false)
                    {
                        return null;
                    }
                }

                return returnValue;
            }

            return null;
        }

 
    }
}
