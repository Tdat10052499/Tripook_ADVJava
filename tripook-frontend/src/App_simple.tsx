import React from 'react';

const App: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '1rem 0'
      }}>
        <nav style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#1f2937' 
          }}>
            📍 Tripook
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '2rem' 
          }}>
            <a href="#" style={{ 
              color: '#4b5563', 
              textDecoration: 'none' 
            }}>
              Trang chủ
            </a>
            <a href="#" style={{ 
              color: '#4b5563', 
              textDecoration: 'none' 
            }}>
              Điểm đến
            </a>
            <a href="#" style={{ 
              color: '#4b5563', 
              textDecoration: 'none' 
            }}>
              Chuyến đi
            </a>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem' 
          }}>
            <a href="#" style={{ 
              color: '#4b5563', 
              textDecoration: 'none' 
            }}>
              Đăng nhập
            </a>
            <a href="#" style={{ 
              backgroundColor: '#2563eb', 
              color: 'white', 
              padding: '0.5rem 1rem', 
              borderRadius: '0.5rem', 
              textDecoration: 'none' 
            }}>
              Đăng ký
            </a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '2rem 1rem' 
      }}>
        {/* Hero Section */}
        <section style={{ 
          textAlign: 'center', 
          padding: '5rem 2rem', 
          background: 'linear-gradient(to right, #2563eb, #7c3aed)', 
          color: 'white', 
          borderRadius: '0.5rem',
          marginBottom: '4rem'
        }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            marginBottom: '1.5rem' 
          }}>
            Khám phá thế giới cùng Tripook
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '2rem', 
            opacity: 0.9 
          }}>
            Lên kế hoạch, chia sẻ và trải nghiệm những chuyến đi tuyệt vời
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center', 
            flexWrap: 'wrap' 
          }}>
            <button style={{ 
              backgroundColor: 'white', 
              color: '#2563eb', 
              padding: '0.75rem 2rem', 
              borderRadius: '0.5rem', 
              fontWeight: '600', 
              border: 'none',
              cursor: 'pointer'
            }}>
              Khám phá điểm đến
            </button>
            <button style={{ 
              border: '2px solid white', 
              backgroundColor: 'transparent',
              color: 'white', 
              padding: '0.75rem 2rem', 
              borderRadius: '0.5rem', 
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Tạo chuyến đi
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section style={{ padding: '4rem 2rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '3rem', 
            color: '#1f2937' 
          }}>
            Tại sao chọn Tripook?
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📍</div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '0.75rem' 
              }}>
                Khám phá điểm đến
              </h3>
              <p style={{ color: '#6b7280' }}>
                Tìm hiểu các địa điểm du lịch tuyệt vời với thông tin chi tiết và đánh giá từ cộng đồng
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '0.75rem' 
              }}>
                Lập kế hoạch dễ dàng
              </h3>
              <p style={{ color: '#6b7280' }}>
                Tạo lịch trình chi tiết cho chuyến đi với các hoạt động và ngân sách được quản lý chặt chẽ
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '0.75rem' 
              }}>
                Chia sẻ trải nghiệm
              </h3>
              <p style={{ color: '#6b7280' }}>
                Kết nối với cộng đồng du lịch, chia sẻ câu chuyện và nhận lời khuyên từ những người đã đi
              </p>
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section style={{ 
          padding: '4rem 2rem', 
          backgroundColor: '#f3f4f6', 
          borderRadius: '0.5rem' 
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '3rem', 
            color: '#1f2937' 
          }}>
            Điểm đến phổ biến
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            {['Đà Lạt', 'Hội An', 'Hạ Long'].map((destination, index) => (
              <div key={index} style={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem', 
                overflow: 'hidden', 
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
              }}>
                <div style={{ 
                  height: '192px', 
                  background: 'linear-gradient(to right, #38bdf8, #e879f9)' 
                }}></div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    marginBottom: '0.5rem' 
                  }}>
                    {destination}
                  </h3>
                  <p style={{ 
                    color: '#6b7280', 
                    marginBottom: '1rem' 
                  }}>
                    Thành phố tuyệt vời với nhiều điểm tham quan
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#fbbf24' }}>⭐</span>
                      <span style={{ 
                        fontSize: '0.875rem', 
                        color: '#6b7280', 
                        marginLeft: '0.25rem' 
                      }}>
                        4.8 (120 đánh giá)
                      </span>
                    </div>
                    <a href="#" style={{ 
                      color: '#2563eb', 
                      fontWeight: '600', 
                      textDecoration: 'none' 
                    }}>
                      Xem chi tiết →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#1f2937', 
        color: 'white', 
        textAlign: 'center', 
        padding: '2rem 0',
        marginTop: '4rem'
      }}>
        <p>© 2025 Tripook. Tất cả quyền được bảo lưu.</p>
      </footer>
    </div>
  );
};

export default App;