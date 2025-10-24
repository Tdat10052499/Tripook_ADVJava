import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>📍 Tripook</span>
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link to="/" style={{ color: '#4b5563', textDecoration: 'none' }}>
              Trang chủ
            </Link>
            <Link to="/destinations" style={{ color: '#4b5563', textDecoration: 'none' }}>
              Điểm đến
            </Link>
            <Link to="/trips" style={{ color: '#4b5563', textDecoration: 'none' }}>
              Chuyến đi
            </Link>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link 
              to="/login" 
              style={{ color: '#4b5563', textDecoration: 'none' }}
            >
              Đăng nhập
            </Link>
            <Link 
              to="/register" 
              style={{ 
                backgroundColor: '#2563eb', 
                color: 'white', 
                padding: '0.5rem 1rem', 
                borderRadius: '0.5rem', 
                textDecoration: 'none' 
              }}
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;