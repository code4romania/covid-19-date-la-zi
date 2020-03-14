# https://hub.docker.com/_/microsoft-dotnet-core
FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine AS build
WORKDIR /source

RUN apk add --no-cache --update nodejs nodejs-npm

# copy csproj and restore as distinct layers
WORKDIR /source/parser/Code4Ro.CoViz19.Parser/
COPY backend-infra/*.csproj /source/backend-infra/
COPY parser/Code4Ro.CoViz19.Parser/*.csproj .
RUN dotnet restore -r linux-musl-x64

# copy and publish app and libraries
COPY parser/Code4Ro.CoViz19.Parser/ ./
COPY backend-infra/ /source/backend-infra/
RUN dotnet publish -c release -o /app -r linux-musl-x64 --self-contained false --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine
# FROM mcr.microsoft.com/dotnet/core/runtime:3.1-alpine
WORKDIR /app
COPY --from=build /app .
# See: https://github.com/dotnet/announcements/issues/20
# Uncomment to enable globalization APIs (or delete)
#ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT false
#RUN apk add --no-cache icu-libs
#ENV LC_ALL en_US.UTF-8
#ENV LANG en_US.UTF-8

ENTRYPOINT ["./Code4Ro.CoViz19.Parser"]
