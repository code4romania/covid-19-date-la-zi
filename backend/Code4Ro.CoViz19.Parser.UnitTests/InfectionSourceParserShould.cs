using System.Collections.Generic;
using System.Linq;
using Code4Ro.CoViz19.Models;
using Code4Ro.CoViz19.Parser.Parsers;
using Shouldly;
using Xunit;
using static Code4Ro.CoViz19.Models.InfectionSourceType;

namespace Code4Ro.CoViz19.Parser.UnitTests
{
    public class InfectionSourceParserShould
    {
        private InfectionSourceParser _parser = new InfectionSourceParser();

        [Theory]
        [InlineData("", Unknown)]
        [InlineData("a călătorit în Italia", Extern)]
        [InlineData("a calatorit în Italia", Extern)]
        [InlineData("venit din Italia in data de 12.03 - Carantinat la Mehedinti", Extern)]
        [InlineData("Venit din Italia in data de 12.03 - Carantinat la Mehedinti", Extern)]
        [InlineData("contact caz confirmat Varsovia", Intern)]
        [InlineData("sosită din Italia, aflată în autoizolare", Extern)]
        [InlineData(" Colegă cu pacientul 5", Intern)]
        [InlineData("medic, manager spital", Intern)]
        [MemberData(nameof(Data))]
        public void ReturnCorrectSourceTypeForGivenText(string text, InfectionSourceType expectedInfectionSourceType)
        {
            _parser.Parse(text).ShouldBe(expectedInfectionSourceType);
        }

        //
        public static IEnumerable<object[]> Data()
        {
            return new(string sourceText, InfectionSourceType sourceType)[] {
                ("contact cetățeanul italian", Intern),
                ("a călătorit în Italia", Extern),
                ("a călătorit la Bergamo", Extern),
                ("contact direct pacient 3", Intern),
                ("contact direct pacient 4", Intern),
                ("a călătorit în Lombardia", Extern),
                (" Colegă cu pacientul 5", Intern),
                ("contact al pacientului 4, au călătorit impreuna", Intern),
                ("a călătorit la Bergamo", Extern),
                ("a călătorit cu pacientul 9", Extern),
                (" contact cu tinerii depistați", Intern),
                ("a călătorit în Italia", Extern),
                (" a călătorit în Italia", Extern),
                ("contact bărbat de 49 de ani nr 12", Intern),
                ("a călătorit în Italia", Extern),
                ("Gerota", Unknown),
                ("contact cu prietena bărbatului de 49 de ani, primul caz din București, caz12", Intern),
                ("contact pacient Gerota", Intern),
                ("contact pacient Gerota", Intern),
                ("contact pacient Gerota", Intern),
                ("a călătorit în Israel", Extern),
                ("a călătorit în Israel", Extern),
                ("a călătorit în UK", Extern),
                ("a călătorit în Germania", Extern),
                (" contact direct", Intern),
                ("contact direct", Intern),
                ("a călătorit în Italia", Extern),
                ("contact pacient Gerota", Intern),
                ("contact pacient Gerota", Intern),
                ("a călătorit la Veneția", Extern),
                ("contact caz confirmat Varșovia", Intern),
                (" contact Gerota", Intern),
                ("aflat în autoizolare", Unknown),
                ("sosită din Italia, aflată în autoizolare", Extern),
                ("a călătorit în Israel", Extern),
                ("a călătorit în Germania", Extern),
                (" contact pacient Gerota", Intern),
                ("nu a călătorit/nu a intrat în contact, probabil lucreaza spital", Intern),
                ("a călătorit în Italia", Extern),
                ("contact cu femeia de 35 de ani care a călătorit în Israel nr23", Intern),
                (" contact direct cu fiul pacientului de la Gerota nr19", Intern),
                ("contact direct cu șofer pacient Gerota", Intern),
                ("sosită din Italia", Extern),
                ("a călătorit în Italia", Extern),
                ("a călătorit în Italia", Extern),
                (" lucrează în Italia", Extern),
                (" a călătorit în Italia", Extern),
                ("contact caz pozitiv", Intern),
                ("contact cu caz pozitiv", Intern),
                ("contact caz pozitiv", Intern),
                ("contact caz pozitiv", Intern),
                ("contact caz pozitiv", Intern),
                (" contact caz pozitiv", Intern),
                ("contact cu persoana care a calatorit Germania", Intern),
                ("coleg birou cu membru al familiei pacient Gerota", Intern),
                ("contact membru familie caz 61", Intern),
                ("contact membru familie caz 61", Intern),
                ("contact membru familie caz 61", Intern),
                ("Contact membru familie pacient nr 39 ", Intern),
                ("Contact membru familie pacient nr 39 ", Intern),
                ("Contact membru familie pacient nr 39 ", Intern),
                ("Contact membru familie pacient nr 39 ", Intern),
                ("venit din Italia in data de 12.03 - Carantinat la Mehedinti", Extern),
                ("Contact membru familiepacient nr69 - mama, venita si ea din Italia in 12.03 - Carantinata la Mehedinti",
                    Intern),
                ("medic, manager spital", Intern),
                ("pacient contactul cu medicul gastroenterolog - caz30", Intern),
                ("venit din Boston pe 11.03, internat pe 12.03 cu simptome", Extern),
                ("contact cu persoana pozitiva", Intern),
                ("contact cu o familievenita din Italia", Intern),
                ("venita din Italia - carantinata", Extern),
                ("venit din Italia 12.03, carantinat in aceeasi zi la Busteni, confirmat pe 13.03 de INBI Bals", Extern),
                ("in izolare din 09.03", Unknown),
                ("Venit din Marea Britanie in data de 12.03. internat din 13.03", Extern),
                ("venit din Italia 12.03, carantinat", Extern),
                ("venit din Italia 12.03, carantinat", Extern),
                ("venit din Italia 11.03, carantinata la Lugoj", Extern),
                ("venit din Italia 10.03, carantinata la Caransebes", Extern),
                ("venit din Londra 09.03, s-a prezentat azi cu frisoane si febra", Extern),
                ("venită din Italia", Extern),
                ("venită din Italia", Extern),
                ("contact mătusă venită din Italia", Intern),
                ("venită din Dubai, lucrează în Ministerul Sănătății", Extern),
                ("venită din Franța", Extern),
                ("venită din Italia", Extern),
                ("venit din Italia", Extern),
                ("contact caz 45, era în autoizolare", Intern),
                ("venit din Italia", Extern),
                ("a călătorit în Germania și Austria, test lucrat în rețeaua privată", Extern),
                ("soț caz 98, test lucrat în rețeaua privată, întors de la Viena", Intern),
                ("contact senator", Intern),
                ("contact senator", Intern),
                ("contact senator", Intern),
                ("venit din Italia, aflat în carantină", Extern),
                ("contact al cazului 59", Intern),
                ("contact al cazului 59", Intern),
                ("contact al cazului 26", Intern),
                ("contact al cazului 26", Intern),
                ("contact al cazului 26", Intern),
                ("aflat în carantină", Unknown),
                ("contact caz 67 și 68  (senator)", Intern),
                ("contact caz 76 (venit din Boston)", Intern),
                ("venită din Italia, în carantină în Timișoara", Extern),
                ("venit din Italia, aflat în carantină Timișoara", Extern),
                ("contact caz 26- asistentă medicală", Intern),
                ("contact caz 26- asistentă medicală", Intern),
                ("venit din Italia în 11.03, aflat în carantină la Reșița", Extern),
                ("venită din Italia, carantină Arad", Extern),
                ("contact caz 67 (senator)", Intern),
                ("venită din Berlin în 11.03", Extern),
                ("venit din Italia, 11.03, în carantină la Satu Mare", Extern),
                ("întors din Norvegia în 13.03", Extern),
                ("asistent mediacl Gerota, contact caz 30", Intern),
                ("inginer horticol, ADP S 4, contact caz 16", Intern),
                ("", Unknown)
            }.Select(t => new object[]{t.sourceText, t.sourceType});
        }
    }
}
