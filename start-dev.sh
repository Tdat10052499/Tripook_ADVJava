#!/bin/bash
# Development startup script

echo "🚀 Starting Tripook Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose > /dev/null 2>&1; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Build and start services
echo "🔨 Building and starting services..."
docker-compose up --build -d

# Wait for services to be healthy
echo "⏳ Waiting for services to start..."
sleep 30

# Check service status
echo "📊 Checking service status..."
docker-compose ps

# Show logs
echo "📝 Recent logs:"
docker-compose logs --tail=20

echo ""
echo "✅ Development environment is ready!"
echo ""
echo "🌐 Frontend: http://localhost"
echo "🔧 Backend API: http://localhost:8080"
echo "📊 Database: localhost:5432"
echo "🗄️ pgAdmin: http://localhost:5050"
echo ""
echo "📖 To view logs: docker-compose logs -f [service-name]"
echo "🛑 To stop: docker-compose down"