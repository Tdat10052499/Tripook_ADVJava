# Tripook - Ứng dụng quản lý chuyến du lịch

## 📋 Mô tả dự án

Tripook là một ứng dụng web giúp người dùng lên kế hoạch, quản lý và chia sẻ các chuyến du lịch của mình. Dự án được xây dựng với:

- **Backend**: Spring Boot 3.5.7 (Java 17)
- **Frontend**: React 18 với TypeScript và TailwindCSS
- **Database**: PostgreSQL 15+

## 🏗️ Cấu trúc dự án

```
Tripook_ADVJava/
├── tripook-backend/          # Spring Boot API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/tripook/tripook_backend/
│   │   │   │       ├── entity/         # JPA Entities
│   │   │   │       ├── repository/     # Data Access Layer
│   │   │   │       ├── service/        # Business Logic
│   │   │   │       ├── controller/     # REST Controllers
│   │   │   │       └── config/         # Configuration
│   │   │   └── resources/
│   │   │       ├── db/migration/       # Flyway migrations
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
├── tripook-frontend/         # React Application
│   ├── src/
│   │   ├── components/       # React Components
│   │   ├── pages/           # Page Components
│   │   ├── services/        # API Services
│   │   ├── types/           # TypeScript Types
│   │   └── App.tsx
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🚀 Hướng dẫn cài đặt

### 1. Yêu cầu hệ thống

- **Java**: JDK 17+
- **Node.js**: 18+
- **PostgreSQL**: 12+
- **Maven**: 3.8+

### 2. Cài đặt Database

```sql
-- Tạo database
CREATE DATABASE tripook_db;

-- Tạo user (tùy chọn)
CREATE USER postgres WITH PASSWORD 'Tdat24102005';
GRANT ALL PRIVILEGES ON DATABASE tripook_db TO postgres;
```

### 3. Cài đặt Backend

```bash
cd tripook-backend

# Build dự án
mvn clean install

# Chạy ứng dụng
mvn spring-boot:run
```

Backend sẽ chạy tại: http://localhost:8080

### 4. Cài đặt Frontend

```bash
cd tripook-frontend

# Cài đặt dependencies
npm install

# Chạy development server
npm start
```

Frontend sẽ chạy tại: http://localhost:3000

## 🗄️ Cấu trúc Database

### Các bảng chính:

1. **users** - Thông tin người dùng
2. **destinations** - Thông tin điểm đến
3. **trips** - Thông tin chuyến đi
4. **trip_activities** - Hoạt động trong chuyến đi
5. **trip_reviews** - Đánh giá chuyến đi

## 🔧 Cấu hình

### Backend (application.properties)
```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/tripook_db
spring.datasource.username=postgres
spring.datasource.password=Tdat24102005

# Server
server.port=8080
server.servlet.context-path=/api
```

### Frontend (Environment Variables)
```bash
REACT_APP_API_URL=http://localhost:8080/api
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/logout` - Đăng xuất

### Destinations
- `GET /api/destinations` - Lấy danh sách điểm đến
- `GET /api/destinations/{id}` - Lấy thông tin điểm đến
- `POST /api/destinations` - Tạo điểm đến mới (Admin)

### Trips
- `GET /api/trips` - Lấy danh sách chuyến đi của user
- `POST /api/trips` - Tạo chuyến đi mới
- `PUT /api/trips/{id}` - Cập nhật chuyến đi
- `DELETE /api/trips/{id}` - Xóa chuyến đi

## 🎨 Tính năng chính

### Người dùng có thể:
- ✅ Đăng ký/Đăng nhập tài khoản
- ✅ Xem danh sách điểm đến du lịch
- ✅ Tạo và quản lý chuyến đi
- ✅ Thêm hoạt động vào chuyến đi
- ✅ Đánh giá và nhận xét chuyến đi
- ✅ Chia sẻ chuyến đi công khai

### Admin có thể:
- ✅ Quản lý người dùng
- ✅ Thêm/sửa/xóa điểm đến
- ✅ Quản lý nội dung

## 🔄 Quy trình phát triển

### 1. Khởi chạy dự án
```bash
# Terminal 1 - Backend
cd tripook-backend
mvn spring-boot:run

# Terminal 2 - Frontend  
cd tripook-frontend
npm start

# Terminal 3 - Database (nếu cần)
psql -U postgres -d tripook_db
```

### 2. Development workflow
1. Tạo feature branch từ main
2. Implement backend API trước
3. Implement frontend components
4. Test integration
5. Create pull request

## 🚨 Troubleshooting

### Lỗi kết nối database:
```bash
# Kiểm tra PostgreSQL đang chạy
sudo service postgresql status

# Kiểm tra connection
psql -U postgres -d tripook_db -h localhost -p 5432
```

### Lỗi CORS:
- Đảm bảo frontend chạy tại `http://localhost:3000`
- Kiểm tra cấu hình CORS trong SecurityConfig

### Lỗi build frontend:
```bash
# Clear cache và reinstall
rm -rf node_modules package-lock.json
npm install
```

## 👥 Team thông tin

- **Developer**: Tdat1
- **Email**: [email@example.com]
- **GitHub**: Tdat10052499

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết.