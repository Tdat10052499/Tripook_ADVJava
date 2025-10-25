import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link to="/" className="text-xl font-bold text-blue-600">
                  🏨 Tripook
                </Link>
              </div>
              
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <Link to="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                    Trang chủ
                  </Link>
                  <Link to="/listings" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                    Chỗ ở
                  </Link>
                  <Link to="/login" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                    Đăng nhập
                  </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Đăng nhập
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Đăng ký
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listings" element={<ListingsPage />} />
      </Routes>
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Khám phá thế giới cùng Tripook
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Lên kế hoạch, chia sẻ và trải nghiệm những chuyến đi tuyệt vời
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition duration-200">
                  Khám phá điểm đến
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition duration-200">
                  Tạo chuyến đi
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Tại sao chọn Tripook?
              </h2>
              <p className="text-xl text-gray-600">
                Những tính năng tuyệt vời giúp bạn có những chuyến đi đáng nhớ
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="text-5xl mb-4">📍</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Khám phá điểm đến
                </h3>
                <p className="text-gray-600">
                  Tìm hiểu các địa điểm du lịch tuyệt vời với thông tin chi tiết và đánh giá từ cộng đồng
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="text-5xl mb-4">📅</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Lập kế hoạch dễ dàng
                </h3>
                <p className="text-gray-600">
                  Tạo lịch trình chi tiết cho chuyến đi với các hoạt động và ngân sách được quản lý chặt chẽ
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="text-5xl mb-4">👥</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Chia sẻ trải nghiệm
                </h3>
                <p className="text-gray-600">
                  Kết nối với cộng đồng du lịch, chia sẻ câu chuyện và nhận lời khuyên từ những người đã đi
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Điểm đến phổ biến
              </h2>
              <p className="text-xl text-gray-600">
                Khám phá những địa điểm được yêu thích nhất
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {['Đà Lạt', 'Hội An', 'Hạ Long'].map((destination, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-200">
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {destination}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Thành phố tuyệt vời với nhiều điểm tham quan hấp dẫn
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-sm text-gray-600 ml-1">
                          4.8 (120 đánh giá)
                        </span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 font-semibold">
                        Xem chi tiết →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">📍 Tripook</div>
            <p className="text-gray-400 mb-8">
              Khám phá thế giới cùng chúng tôi
            </p>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400">
                © 2025 Tripook. Tất cả quyền được bảo lưu.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </Router>
  );
};

export default App;
