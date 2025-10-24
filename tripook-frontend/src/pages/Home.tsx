import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div style={{ padding: '2rem 0' }}>
      {/* Hero Section */}
      <section style={{ 
        textAlign: 'center', 
        padding: '5rem 2rem', 
        background: 'linear-gradient(to right, #2563eb, #7c3aed)', 
        color: 'white', 
        borderRadius: '0.5rem',
        marginBottom: '4rem'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Khám phá thế giới cùng Tripook
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
            Lên kế hoạch, chia sẻ và trải nghiệm những chuyến đi tuyệt vời
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/destinations" 
              style={{ 
                backgroundColor: 'white', 
                color: '#2563eb', 
                padding: '0.75rem 2rem', 
                borderRadius: '0.5rem', 
                fontWeight: '600', 
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Khám phá điểm đến
            </Link>
            <Link 
              to="/trips" 
              style={{ 
                border: '2px solid white', 
                color: 'white', 
                padding: '0.75rem 2rem', 
                borderRadius: '0.5rem', 
                fontWeight: '600', 
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Tạo chuyến đi
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem', color: '#1f2937' }}>
            Tại sao chọn Tripook?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📍</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Khám phá điểm đến</h3>
              <p style={{ color: '#6b7280' }}>
                Tìm hiểu các địa điểm du lịch tuyệt vời với thông tin chi tiết và đánh giá từ cộng đồng
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Lập kế hoạch dễ dàng</h3>
              <p style={{ color: '#6b7280' }}>
                Tạo lịch trình chi tiết cho chuyến đi với các hoạt động và ngân sách được quản lý chặt chẽ
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Chia sẻ trải nghiệm</h3>
              <p style={{ color: '#6b7280' }}>
                Kết nối với cộng đồng du lịch, chia sẻ câu chuyện và nhận lời khuyên từ những người đã đi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section style={{ padding: '4rem 2rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem', color: '#1f2937' }}>
            Điểm đến phổ biến
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[1, 2, 3].map((item) => (
              <div key={item} style={{ backgroundColor: 'white', borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ height: '192px', background: 'linear-gradient(to right, #38bdf8, #e879f9)' }}></div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Đà Lạt</h3>
                  <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Thành phố ngàn hoa với khí hậu mát mẻ</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#fbbf24' }}>⭐</span>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280', marginLeft: '0.25rem' }}>4.8 (120 đánh giá)</span>
                    </div>
                    <Link to="/destinations" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>
                      Xem chi tiết →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;