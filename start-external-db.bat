@echo off
REM Development startup script for Windows with External Database

echo 🚀 Starting Tripook Development Environment with External Database...

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker first.
    pause
    exit /b 1
)

REM Check database connection
echo 🔍 Testing database connection...
docker run --rm postgres:15-alpine psql -h host.docker.internal -p 5432 -U postgres -d tripook_db -c "\dt" >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Cannot connect to external database. Please ensure:
    echo    - PostgreSQL is running on localhost:5432
    echo    - Database 'tripook_db' exists
    echo    - User 'postgres' has access
    echo.
    echo 🛠️  You can create the database using:
    echo    psql -U postgres -c "CREATE DATABASE tripook_db;"
    echo.
    pause
)

REM Stop any existing containers
echo 🛑 Stopping existing containers...
docker-compose -f docker-compose.external-db.yml down

REM Build and start services
echo 🔨 Building and starting services...
docker-compose -f docker-compose.external-db.yml up --build -d

REM Wait for services to be healthy
echo ⏳ Waiting for services to start...
timeout /t 30 /nobreak >nul

REM Check service status
echo 📊 Checking service status...
docker-compose -f docker-compose.external-db.yml ps

REM Show logs
echo 📝 Recent logs:
docker-compose -f docker-compose.external-db.yml logs --tail=20

echo.
echo ✅ Development environment is ready!
echo.
echo 🌐 Frontend: http://localhost
echo 🔧 Backend API: http://localhost:8080
echo 🔍 Health Check: http://localhost:8080/api/health
echo 📊 Database: localhost:5432 (external)
echo.
echo 📖 To view logs: docker-compose -f docker-compose.external-db.yml logs -f [service-name]
echo 🛑 To stop: docker-compose -f docker-compose.external-db.yml down
echo.
pause