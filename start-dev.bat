@echo off
REM Development startup script for Windows

echo 🚀 Starting Tripook Development Environment...

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker first.
    pause
    exit /b 1
)

REM Check if Docker Compose is available
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    pause
    exit /b 1
)

REM Stop any existing containers
echo 🛑 Stopping existing containers...
docker-compose down

REM Build and start services
echo 🔨 Building and starting services...
docker-compose up --build -d

REM Wait for services to be healthy
echo ⏳ Waiting for services to start...
timeout /t 30 /nobreak >nul

REM Check service status
echo 📊 Checking service status...
docker-compose ps

REM Show logs
echo 📝 Recent logs:
docker-compose logs --tail=20

echo.
echo ✅ Development environment is ready!
echo.
echo 🌐 Frontend: http://localhost
echo 🔧 Backend API: http://localhost:8080
echo 📊 Database: localhost:5432
echo 🗄️ pgAdmin: http://localhost:5050
echo.
echo 📖 To view logs: docker-compose logs -f [service-name]
echo 🛑 To stop: docker-compose down
echo.
pause