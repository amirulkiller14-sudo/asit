$ErrorActionPreference = 'Stop'
if (-not (Get-Command dotnet -ErrorAction SilentlyContinue)) {
    throw '.NET 8 SDK not found. Install it from https://dotnet.microsoft.com/download/dotnet/8.0'
}
dotnet publish .\ObsidianGamesAdminTool.csproj -c Release -r win-x64 --self-contained true /p:PublishSingleFile=true /p:IncludeNativeLibrariesForSelfExtract=true /p:EnableCompressionInSingleFile=true
if ($LASTEXITCODE -ne 0) { throw "dotnet publish failed with exit code $LASTEXITCODE" }
Write-Host 'Build complete: .\bin\Release\net8.0-windows\win-x64\publish\ObsidianGamesAdminTool.exe'
