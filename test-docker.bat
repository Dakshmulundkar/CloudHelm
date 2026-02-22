@echo off
echo Testing Docker build for CloudHelm backend...

echo.
echo Building Docker image...
docker build -f backend/Dockerfile -t cloudhelm-test .

if %ERRORLEVEL% NEQ 0 (
    echo Docker build failed!
    pause
    exit /b 1
)

echo.
echo Docker build successful!
echo.
echo To test locally, run:
echo docker run -p 8000:8000 --env-file backend/.env cloudhelm-test
echo.
echo Then visit: http://localhost:8000/health
echo.
pause