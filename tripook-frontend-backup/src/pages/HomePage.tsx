import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Tìm chỗ ở hoàn hảo cho chuyến đi của bạn
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Khám phá hàng triệu căn hộ, nhà riêng và khách sạn trên toàn thế giới
            </p>
            <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa điểm
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập thành phố, quận..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nhận phòng
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trả phòng
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Khách
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>1 khách</option>
                    <option>2 khách</option>
                    <option>3 khách</option>
                    <option>4+ khách</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition duration-200">
                  🔍 Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loại chỗ ở phổ biến
            </h2>
            <p className="text-xl text-gray-600">
              Tìm kiếm theo loại hình lưu trú phù hợp với nhu cầu
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🏠', name: 'Nhà riêng', count: '2,456 chỗ ở' },
              { icon: '🏨', name: 'Khách sạn', count: '1,234 chỗ ở' },
              { icon: '🏡', name: 'Villa', count: '856 chỗ ở' },
              { icon: '🏢', name: 'Căn hộ', count: '3,567 chỗ ở' }
            ].map((type, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-gray-50 group-hover:bg-blue-50 rounded-lg p-6 text-center transition duration-200">
                  <div className="text-4xl mb-3">{type.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{type.name}</h3>
                  <p className="text-sm text-gray-600">{type.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Chỗ ở được yêu thích
            </h2>
            <p className="text-xl text-gray-600">
              Những lựa chọn hàng đầu từ cộng đồng du lịch
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-200">
                <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500"></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Căn hộ 2 phòng ngủ tại trung tâm
                    </h3>
                    <div className="flex items-center">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm text-gray-600 ml-1">4.9</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Hà Nội, Việt Nam • 2 phòng ngủ • 1 phòng tắm
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        1,200,000 ₫
                      </span>
                      <span className="text-gray-600">/đêm</span>
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

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn Tripook?
            </h2>
            <p className="text-xl text-gray-600">
              Những lý do khiến hàng triệu khách hàng tin tưởng chúng tôi
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                An toàn & Bảo mật
              </h3>
              <p className="text-gray-600">
                Hệ thống bảo mật cao cấp và chính sách hoàn tiền linh hoạt để bạn yên tâm đặt phòng
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Chất lượng đảm bảo
              </h3>
              <p className="text-gray-600">
                Tất cả chỗ ở được kiểm duyệt kỹ lưỡng và có đánh giá từ khách hàng thực tế
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-5xl mb-4">📞</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Hỗ trợ 24/7
              </h3>
              <p className="text-gray-600">
                Đội ngũ chăm sóc khách hàng chuyên nghiệp sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;