# Obsidian Games Admin Tool — WebView2 edition

This is a recreated Windows desktop project based on the supplied WebView2 project. It preserves the existing full-window dark WebView2 presentation and loads the live admin site at `https://admin.obsidiangames.net/`.

## Included additions

- Moderator Quick Scripts panel injected into the existing page without replacing its layout or theme.
- Quick-copy scripts for General Inquiry, Partnership Application, CBT/Event Winner, Tech Support, Account Support, Clan Registration, Community Registration, and Streamers Application.
- Moderation/closing scripts for wrong category, no concern/unresponsive, already-addressed concerns, and the PH Chat Discord-code warning (1-day timeout).
- Hide/show control and clipboard fallback.

## Build on Windows

Requirements: Windows 10/11, .NET 8 SDK, and Microsoft Edge WebView2 Runtime.

1. Extract this folder.
2. Double-click `build-windows.bat`, or run `build-windows.ps1` in PowerShell.
3. The self-contained single-file EXE will be created at `bin\Release\net8.0-windows\win-x64\publish\ObsidianGamesAdminTool.exe`.

The first build needs internet access to restore the Microsoft.Web.WebView2 NuGet package. The build must be run on Windows because this is a WinForms application targeting `win-x64`.

## Notes

- The desktop shell loads the live website. Website-owned content, forms, and server behavior remain controlled by the website.
- The injected suggestions panel is added by the desktop app at document creation; it does not modify the website's server files.
- WebView2 profile, cookies, and logs are stored under `%APPDATA%\ObsidianGamesAdminTool`.
