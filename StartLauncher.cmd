@echo off
setlocal DisableDelayedExpansion
cd /d "%~dp0"
set "COCOS_LAUNCHER_ROOT=%~dp0"
set "COCOS_LAUNCHER_ACTION=launch"
set "COCOS_LAUNCHER_NODE="
if "%~1"=="" goto find_node
if /i "%~1"=="--check" goto mode_check
if /i "%~1"=="--prepare-runtime" goto mode_prepare
echo Usage: StartLauncher.cmd [--check or --prepare-runtime]
exit /b 1

:mode_check
set "COCOS_LAUNCHER_ACTION=check"
goto find_node

:mode_prepare
set "COCOS_LAUNCHER_ACTION=prepare"
goto find_local_node

:find_node
if /i "%COCOS_LAUNCHER_ACTION%"=="launch" if not exist "%~dp0server.cjs" (
  echo [Launcher] Missing server.cjs. Keep the complete launcher files together.
  goto failed
)
where.exe node.exe >nul 2>nul
if errorlevel 1 goto find_local_node
node.exe -e "process.exit(Number(process.versions.node.split('.')[0]) >= 22 ? 0 : 1)" >nul 2>nul
if errorlevel 1 goto find_local_node
set "COCOS_LAUNCHER_NODE=node.exe"
goto node_ready

:find_local_node
if not exist "%~dp0runtime\node.exe" goto missing_node
"%~dp0runtime\node.exe" -e "process.exit(Number(process.versions.node.split('.')[0]) >= 22 ? 0 : 1)" >nul 2>nul
if errorlevel 1 goto missing_node
set "COCOS_LAUNCHER_NODE=%~dp0runtime\node.exe"
goto node_ready

:missing_node
if /i "%COCOS_LAUNCHER_ACTION%"=="check" (
  echo [Launcher] Node.js 22 or newer was not found.
  echo [Launcher] Normal startup will download an official portable LTS runtime.
  exit /b 1
)
echo [Launcher] Preparing a local portable Node.js runtime...
call :download_node
if errorlevel 1 goto failed
set "COCOS_LAUNCHER_NODE=%~dp0runtime\node.exe"

:node_ready
echo [Launcher] Node.js: "%COCOS_LAUNCHER_NODE%"
"%COCOS_LAUNCHER_NODE%" --version
if errorlevel 1 goto failed
if /i "%COCOS_LAUNCHER_ACTION%"=="check" (
  echo [Launcher] Runtime check passed. No server was started.
  exit /b 0
)
if /i "%COCOS_LAUNCHER_ACTION%"=="prepare" (
  echo [Launcher] Portable runtime is ready in .\runtime. No server was started.
  exit /b 0
)
echo Starting Cocos Play Launcher...
echo Local launcher port: 8090.
echo Keep this window open while playing. Close it to stop this server.
"%COCOS_LAUNCHER_NODE%" "%~dp0server.cjs" --port 8090 --open
if errorlevel 1 goto failed
exit /b 0

:failed
echo.
echo [Launcher] Could not complete startup. See the error above.
if /i "%COCOS_LAUNCHER_ACTION%"=="launch" pause
exit /b 1

:download_node
rem Inline PowerShell uses the normal command interface; no execution-policy changes.
rem Downloads stay in this folder. Only the verified node.exe and license are kept.
if not exist "%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" (
  echo [Launcher] Windows PowerShell is required for the automatic download.
  exit /b 1
)
"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoLogo -NoProfile -Command ^
  "$ErrorActionPreference='Stop'; $ProgressPreference='SilentlyContinue'; $temp=$null; $archive=$null;" ^
  "try {" ^
  "  if (-not [Environment]::Is64BitOperatingSystem) { throw 'A 64-bit Windows system is required.' };" ^
  "  $arch=if ($env:PROCESSOR_ARCHITEW6432 -eq 'ARM64' -or $env:PROCESSOR_ARCHITECTURE -eq 'ARM64') { 'arm64' } else { 'x64' };" ^
  "  $root=[IO.Path]::GetFullPath($env:COCOS_LAUNCHER_ROOT); $runtime=[IO.Path]::GetFullPath((Join-Path $root 'runtime'));" ^
  "  $prefix=$root.TrimEnd([IO.Path]::DirectorySeparatorChar)+[IO.Path]::DirectorySeparatorChar;" ^
  "  if (-not $runtime.StartsWith($prefix,[StringComparison]::OrdinalIgnoreCase)) { throw 'Invalid runtime directory.' };" ^
  "  if (Test-Path -LiteralPath $runtime) { if ((Get-Item -LiteralPath $runtime -Force).Attributes -band [IO.FileAttributes]::ReparsePoint) { throw 'The runtime folder must not be a junction or symlink.' } };" ^
  "  New-Item -ItemType Directory -Path $runtime -Force | Out-Null;" ^
  "  $temp=Join-Path $runtime ('.download-'+[Guid]::NewGuid().ToString('N')); New-Item -ItemType Directory -Path $temp | Out-Null;" ^
  "  Write-Host '[Launcher] Reading the official Node.js LTS release list...';" ^
  "  $releases=(Invoke-WebRequest -Uri 'https://nodejs.org/dist/index.json' -UseBasicParsing -TimeoutSec 30).Content | ConvertFrom-Json;" ^
  "  $release=$releases | Where-Object { $_.lts -and $_.version -match '^v\d+\.\d+\.\d+$' -and $_.files -contains ('win-'+$arch+'-zip') } | Sort-Object { [version]($_.version.Substring(1)) } -Descending | Select-Object -First 1;" ^
  "  if (-not $release -or [int]($release.version.Split('.')[0].Substring(1)) -lt 22) { throw 'No compatible official Windows LTS release was found.' };" ^
  "  $package='node-'+$release.version+'-win-'+$arch; $filename=$package+'.zip'; $base='https://nodejs.org/dist/'+$release.version+'/';" ^
  "  $sums=(Invoke-WebRequest -Uri ($base+'SHASUMS256.txt') -UseBasicParsing -TimeoutSec 30).Content;" ^
  "  $pattern='^[a-fA-F0-9]{64}\s+\*?'+[regex]::Escape($filename)+'$';" ^
  "  $line=$sums -split '[\r\n]+' | Where-Object { $_ -match $pattern } | Select-Object -First 1;" ^
  "  if (-not $line) { throw 'The official SHA256 checksum was not found.' }; $expected=($line -split '\s+')[0].ToLowerInvariant();" ^
  "  $zip=Join-Path $temp $filename; Write-Host ('[Launcher] Downloading '+$release.version+' for Windows '+$arch+'...');" ^
  "  Invoke-WebRequest -Uri ($base+$filename) -OutFile $zip -UseBasicParsing -TimeoutSec 180;" ^
  "  $sha=[Security.Cryptography.SHA256]::Create(); $fileStream=$null; try { $fileStream=[IO.File]::OpenRead($zip); $actual=[BitConverter]::ToString($sha.ComputeHash($fileStream)).Replace('-','').ToLowerInvariant() } finally { if ($fileStream) { $fileStream.Dispose() }; $sha.Dispose() }; if ($actual -cne $expected) { throw 'SHA256 verification failed. The download will not be executed.' };" ^
  "  Write-Host '[Launcher] SHA256 verified. Extracting the portable runtime...'; Add-Type -AssemblyName System.IO.Compression.FileSystem;" ^
  "  $archive=[IO.Compression.ZipFile]::OpenRead($zip); $nodeEntry=$archive.GetEntry($package+'/node.exe'); $licenseEntry=$archive.GetEntry($package+'/LICENSE');" ^
  "  if (-not $nodeEntry -or -not $licenseEntry) { throw 'The official archive is incomplete.' };" ^
  "  $node=Join-Path $temp 'node.exe'; $license=Join-Path $temp 'Node-LICENSE.txt';" ^
  "  [IO.Compression.ZipFileExtensions]::ExtractToFile($nodeEntry,$node); [IO.Compression.ZipFileExtensions]::ExtractToFile($licenseEntry,$license); $archive.Dispose(); $archive=$null;" ^
  "  $versionOutput= & $node --version; if ($LASTEXITCODE -ne 0 -or $versionOutput.Trim() -cne $release.version) { throw 'The downloaded Node.js runtime could not run.' };" ^
  "  foreach ($name in @('node.exe','Node-LICENSE.txt','node-info.txt')) { $target=Join-Path $runtime $name; if ((Test-Path -LiteralPath $target) -and ((Get-Item -LiteralPath $target -Force).Attributes -band [IO.FileAttributes]::ReparsePoint)) { throw 'A runtime file must not be a symlink.' } };" ^
  "  Copy-Item -LiteralPath $node -Destination (Join-Path $runtime 'node.exe') -Force; Copy-Item -LiteralPath $license -Destination (Join-Path $runtime 'Node-LICENSE.txt') -Force;" ^
  "  @(('Version: '+$release.version),('Architecture: '+$arch),('Source: '+$base+$filename),('SHA256: '+$expected)) | Set-Content -LiteralPath (Join-Path $runtime 'node-info.txt') -Encoding UTF8;" ^
  "  Write-Host '[Launcher] Portable runtime is ready. System settings were not changed.';" ^
  "} catch { [Console]::Error.WriteLine('[Launcher] '+$_.Exception.Message); exit 1 }" ^
  "finally {" ^
  "  if ($archive) { $archive.Dispose() };" ^
  "  if ($temp -and (Test-Path -LiteralPath $temp)) { $resolved=[IO.Path]::GetFullPath($temp); $parent=[IO.Directory]::GetParent($resolved).FullName; if ($parent.Equals($runtime,[StringComparison]::OrdinalIgnoreCase) -and [IO.Path]::GetFileName($resolved).StartsWith('.download-')) { Remove-Item -LiteralPath $resolved -Recurse -Force -ErrorAction SilentlyContinue } };" ^
  "}"
exit /b %ERRORLEVEL%
