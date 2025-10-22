@echo off
echo 🚀 Testing Spring Boot Backend
echo ================================

cd /d "C:\Users\tdat1\Tripook_ADVJava\tripook-backend"
echo Current directory: %CD%

echo.
echo 🔍 Checking Maven wrapper...
if exist "mvnw.cmd" (
    echo ✅ mvnw.cmd found
) else (
    echo ❌ mvnw.cmd not found
    pause
    exit /b 1
)

echo.
echo 🏗️ Building application...
call mvnw.cmd clean compile -q
if %errorlevel% neq 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo ✅ Build successful!
echo.
echo 🚀 Starting Spring Boot Application...
echo 📊 Database will be automatically tested on startup
echo 🌐 Backend will be available at: http://localhost:8080
echo 🔍 Health check: http://localhost:8080/api/health
echo.
echo Press Ctrl+C to stop the application
echo.

call mvnw.cmd spring-boot:run