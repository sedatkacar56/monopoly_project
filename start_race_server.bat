@echo off
cd /d "C:\Users\skacar\Documents\monopoly_classic"

REM Start silent Python server
start "" python -m http.server 8001

REM Create a random number to force cache refresh
set /a R=%RANDOM%

REM Open the game with cache-busting parameter
start "" "http://localhost:8001/index.html?nocache=%R%"

