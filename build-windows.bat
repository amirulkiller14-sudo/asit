@echo off
setlocal
where dotnet >nul 2>nul
if errorlevel 1 (
  echo .NET 8 SDK was not found. Install it from https://dotnet.microsoft.com/download/dotnet/8.0
  pause
  exit /b 1
)
dotnet publish ObsidianGamesAdminTool.csproj -c Release -r win-x64 --self-contained true /p:PublishSingleFile=true /p:IncludeNativeLibrariesForSelfExtract=true /p:EnableCompressionInSingleFile=true
if errorlevel 1 (
  echo Build failed. Review the errors above.
  pause
  exit /b 1
)
echo.
echo Build complete:
echo bin\Release\net8.0-windows\win-x64\publish\ObsidianGamesAdminTool.exe
pause
