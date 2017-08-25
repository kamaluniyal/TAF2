@echo off
setlocal

REM :check_chromedriver
REM where chromedriver > nul 2>&1
REM if not errorlevel 1 goto run
REM echo Could not find chromedriver
REM exit /b 1
:run
node_modules\.bin\mocha --reporter mochawesome example/test.js --timeout 50000	--reporter-options overwrite=false,timestamp,autoOpen=true
endlocal