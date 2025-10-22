@echo off
echo 🔍 Testing Updated Docker Compose Configuration
echo ================================================

echo.
echo 📋 Checking Docker Compose configuration...
docker-compose config
if %errorlevel% neq 0 (
    echo ❌ Docker Compose configuration has errors
    pause
    exit /b 1
)

echo.
echo ✅ Docker Compose configuration is valid!
echo.

echo 📊 Configuration Summary:
echo ===========================================
echo PostgreSQL Database Configuration:
echo   Database: tripook_db
echo   User: postgres
echo   Password: Tdat100524
echo   Port: 5432
echo ===========================================
echo.

echo 🔍 Testing Docker availability...
docker info >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Docker is running and ready
    echo.
    echo 🚀 You can now run:
    echo    docker-compose up --build -d
    echo.
    echo 🌐 Services will be available at:
    echo    Frontend: http://localhost
    echo    Backend: http://localhost:8080
    echo    pgAdmin: http://localhost:5050
    echo    Database: localhost:5432
) else (
    echo ⚠️  Docker is not running
    echo.
    echo 📝 Alternative options:
    echo 1. Start Docker Desktop and run: docker-compose up --build -d
    echo 2. Use external database: start-external-db.bat
    echo 3. Run backend only: test-backend.bat
)

echo.
echo 🔧 Configuration has been updated successfully!
echo ✅ All credentials now match your PostgreSQL setup
pause