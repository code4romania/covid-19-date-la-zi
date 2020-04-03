using System.Collections.Generic;
using Code4Ro.CoViz19.Models.ParsedPdfModels;

namespace Code4Ro.CoViz19.Api.StaticData
{
    /// <summary>
    /// Data from here https://en.wikipedia.org/wiki/Counties_of_Romania
    /// </summary>
    public static class Data
    {
        public static readonly Dictionary<County, int> CountyPopulation = new Dictionary<County, int>()
        {
            {County.AB,342376},
            {County.AR,430629},
            {County.AG,612431},
            {County.BC,616168},
            {County.BH,575398},
            {County.BN,286225},
            {County.BT,412626},
            {County.BV,549217},
            {County.BR,321212},
            {County.B,1883425},
            {County.BZ,451069},
            {County.CS,295579},
            {County.CL,306691},
            {County.CJ,691106},
            {County.CT,684082},
            {County.CV,210177},
            {County.DB,518745},
            {County.DJ,660544},
            {County.GL,536167},
            {County.GR,281422},
            {County.GJ,341594},
            {County.HR,310867},
            {County.HD,418565},
            {County.IL,274148},
            {County.IS,772348},
            {County.IF,388738},
            {County.MM,478659},
            {County.MH,265390},
            {County.MS,550846},
            {County.NT,470766},
            {County.OT,436400},
            {County.PH,762886},
            {County.SM,344360},
            {County.SJ,224384},
            {County.SB,397322},
            {County.SV,634810},
            {County.TR,380123},
            {County.TM,683540},
            {County.TL,213083},
            {County.VS,395499},
            {County.VL,371714},
            {County.VN,340310},
        };
    }
}