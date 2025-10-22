# Tripook - Travel Planning Application# Tripook_ADVJava

**Tripook**

Tripook là một ứng dụng web hiện đại cho việc lập kế hoạch du lịch, được xây dựng với công nghệ full-stack bao gồm Spring Boot backend và React frontend.

**1. Tripook description:**

## 🛠️ Công nghệ sử dụngA full-stack web application for travel booking, inspired by Airbnb. This is a student project designed to demonstrate modern web development principles with a feature-rich, scalable marketplace platform. Find and book your next adventure with Tripook!



### Backend (Spring Boot)**2. Key features**

- **Java 17+**: Ngôn ngữ lập trình chínhTripook provides a seamless experience for three main user roles: Travelers, Hosts, and Administrators.

- **Spring Boot 3.5.6**: Framework chính cho backend

- **Spring Security**: Bảo mật và xác thực**- For Travelers (Users)**

- **Spring Data JPA**: ORM và database access  - Intuitive Search & Filtering: Easily find accommodations or tours by location, date, price, and number of guests.

- **PostgreSQL**: Database chính  - Interactive Map View: Visualize all available services on an interactive map, powered by OpenStreetMap.

- **Flyway**: Database migration  - Seamless Booking System: A straightforward booking process with a simulated payment flow.

- **Maven**: Build tool và dependency management  - User Profiles & History: Manage personal information and view past and upcoming trips.

  - Reviews & Ratings: Leave authentic feedback on services after a completed trip to help the community.

### Frontend (React + TailwindCSS)

- **React 18**: JavaScript framework**- For Hosts (Service Providers)**

- **Vite**: Build tool và dev server  - Full Listing Management (CRUD): Easily create, update, and manage service listings with detailed descriptions and photos.

- **TailwindCSS**: CSS framework cho styling  - Dynamic Calendar: Manage availability and block out dates that are unavailable.

- **Node.js 18+**: Runtime environment  - Booking Management: View, confirm, or decline booking requests from travelers.

  - Analytics Dashboard: Get insights into revenue, booking rates, and views to optimize listings.

### DevOps & Triển khai  - Price Suggestion Tool: A simple tool to suggest price adjustments for weekends and holidays.

- **Docker & Docker Compose**: Containerization

- **Nginx**: Reverse proxy và static file serving**- For Administrators**

- **PostgreSQL**: Database  - User Management: Oversee all user accounts with the ability to manage roles and permissions.

- **GitHub**: Source control  - Service Moderation: Approve or reject new listings to ensure quality and safety on the platform.

  - Platform Analytics: Access high-level reports on system activity and health.

## 🚀 Hướng dẫn cài đặt

**3. Tech Stack**

### Yêu cầu hệ thốngThis project leverages a modern, robust, and scalable technology stack.

- Java 17 hoặc mới hơn<img width="1836" height="291" alt="image" src="https://github.com/user-attachments/assets/ae65c251-840c-4f3f-a9e7-41894554df5a" />

- Node.js 18 hoặc mới hơn

- Docker & Docker Compose**4. System Architecture**

- Git**- Context Diagram**

<img width="1838" height="1379" alt="image" src="https://github.com/user-attachments/assets/807a98d1-a0d1-4ec6-8e22-d8b06a6c1439" />

### 1. Clone repository**- Database Schema**

```bash

git clone https://github.com/Tdat10052499/Tripook_ADVJava.githttps://github.com/user-attachments/assets/5523d20c-0eca-4feb-9cf4-399b1782c1f5

cd Tripook_ADVJava

```**5. Working Team**

1. Ho Du Tuan Dat

### 2. Chạy với Docker (Khuyến nghị)   - Student's id: 2374802010097

   - Github link: https://github.com/Tdat10052499

#### Windows:  

```cmd2. Nguyen Minh Chinh

start-dev.bat   - Student's id: 2275106050051

```   - Github link: https://github.com/F4ol4n

  

#### Linux/Mac:3. Nguyen Thi Phuong Nhung

```bash   - Student's id: 2374802013554

chmod +x start-dev.sh   - Github link: https://github.com/NguyenThiPhuongNhung2005 

./start-dev.sh

```



#### Hoặc chạy thủ công:
```bash
docker-compose up --build -d
```

### 3. Chạy development mode (không dùng Docker)

#### Backend:
```bash
cd tripook-backend
./mvnw spring-boot:run
```

#### Frontend:
```bash
cd tripook-frontend
npm install
npm run dev
```

## 🌐 Truy cập ứng dụng

Sau khi khởi động thành công:

- **Frontend**: http://localhost (hoặc http://localhost:5173 trong dev mode)
- **Backend API**: http://localhost:8080
- **API Health Check**: http://localhost:8080/api/health
- **Database**: localhost:5432
- **pgAdmin**: http://localhost:5050
  - Email: admin@tripook.com
  - Password: admin123

## 📁 Cấu trúc dự án

```
Tripook_ADVJava/
├── tripook-backend/           # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/          # Java source code
│   │   │   └── resources/     # Configuration files
│   │   └── test/              # Test files
│   ├── Dockerfile
│   └── pom.xml
├── tripook-frontend/          # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/            # Page components
│   │   └── utils/            # Utility functions
│   ├── Dockerfile
│   ├── package.json
│   └── tailwind.config.js
├── database/
│   └── init/                  # Database initialization scripts
├── docker-compose.yml         # Development environment
├── docker-compose.prod.yml    # Production environment
├── start-dev.bat             # Windows startup script
├── start-dev.sh              # Linux/Mac startup script
└── README.md
```

## 🔧 Configuration

### Database Configuration
- **Development**: PostgreSQL container được tự động tạo
- **Production**: Cấu hình trong `docker-compose.prod.yml`

### Environment Variables
Tạo file `.env` để cấu hình:

```env
# Database
DATABASE_NAME=tripook_prod_db
DATABASE_USER=tripook_prod_user
DATABASE_PASSWORD=your_secure_password

# Backend
SPRING_PROFILES_ACTIVE=prod
JAVA_OPTS=-Xmx2g -Xms1g

# Frontend
REACT_APP_API_URL=http://localhost:8080
```

## 🧪 Testing

### Backend Tests
```bash
cd tripook-backend
./mvnw test
```

### Frontend Tests
```bash
cd tripook-frontend
npm test
```

## 📊 Monitoring & Logs

### Xem logs của services:
```bash
# Tất cả services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Health Checks
- Backend: http://localhost:8080/api/health
- Frontend: http://localhost/
- Database: Tự động kiểm tra trong Docker

## 🚢 Production Deployment

### 1. Sử dụng Docker Compose Production
```bash
# Tạo .env file với production values
cp .env.example .env

# Start production environment
docker-compose -f docker-compose.prod.yml up -d
```

### 2. Manual Deployment
```bash
# Build backend
cd tripook-backend
./mvnw clean package -DskipTests

# Build frontend
cd ../tripook-frontend
npm ci
npm run build

# Deploy artifacts
```

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📝 API Documentation

API documentation sẽ có sẵn tại:
- Swagger UI: http://localhost:8080/swagger-ui/index.html
- OpenAPI JSON: http://localhost:8080/v3/api-docs

## 🐛 Troubleshooting

### Common Issues

1. **Port đã được sử dụng**
   ```bash
   # Kiểm tra port được sử dụng
   netstat -an | grep :8080
   netstat -an | grep :3000
   
   # Dừng service đang chạy
   docker-compose down
   ```

2. **Database connection issues**
   ```bash
   # Restart database container
   docker-compose restart postgres
   
   # Check database logs
   docker-compose logs postgres
   ```

3. **Frontend không kết nối được backend**
   - Kiểm tra backend đã chạy chưa: http://localhost:8080/api/health
   - Kiểm tra CORS configuration trong SecurityConfig.java

## 📞 Support

Nếu gặp vấn đề, hãy tạo issue trên GitHub repository hoặc liên hệ qua email.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Developed with ❤️ by Tripook Team**