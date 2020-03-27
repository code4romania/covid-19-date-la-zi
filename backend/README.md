# General description:
Both Parser and Api projects use .net Core 3.1 [download](https://dotnet.microsoft.com/download/dotnet-core/3.1) 
MediatR for CQRS pattern
Amazon AWS for uploading in S3 storage

# Parser

This project contains code related to parsing the original data from the MOH into a structure we can use and expose via the API.

This project tries to parse an uploaded PDF files using [FreeSpire.PDF](https://www.e-iceblue.com/Introduce/free-pdf-component.html) and outputs a json file then saves it to S3 storage.
Future work:

 - MoH can sometimes provide an image  instead of pdf with statistical
   data for a day maybe use
   [OCR](https://en.wikipedia.org/wiki/Optical_character_recognition)
   library to extract text from that image .
  - Add a form for manual input of data in frontend for parser
  - Add authentication / authorization using a token
  - cover with tests
  - cleanup unused code
  
# API

This project contains code related to the API that transforms and serves data for UI components. In the current implementation data is served from json file uploaded by the parser.
Future work:
- cleanup project
- remove V2 suffix from classes 
- cover with tests 
- cleanup unused code

# Running the projects
## Docker 
`docker build -f Dockerfile-api .`
`docker build -f Dockerfile-api .`
## Visual Studio / Visual Studio Code
### Parser/API
Open corresponding sln file build & run and start hacking
