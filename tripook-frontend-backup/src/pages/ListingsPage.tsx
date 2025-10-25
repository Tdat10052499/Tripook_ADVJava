import React, { useState, useEffect } from 'react';
import { listingsApi } from '../services/api';
import { Listing, ListingSearchParams } from '../types';

const ListingsPage: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ListingSearchParams>({
    page: 0,
    size: 12
  });

  useEffect(() => {
    fetchListings();
  }, [filters]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await listingsApi.getAll(filters);
      setListings(response.data || []);
    } catch (error) {
      console.error('Lỗi khi tải danh sách chỗ ở:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof ListingSearchParams, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 0 }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Tìm chỗ ở phù hợp
          </h1>
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thành phố
              </label>
              <input
                type="text"
                placeholder="Nhập tên thành phố"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleFilterChange('city', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loại chỗ ở
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="">Tất cả</option>
                <option value="APARTMENT">Căn hộ</option>
                <option value="HOUSE">Nhà riêng</option>
                <option value="HOTEL">Khách sạn</option>
                <option value="VILLA">Villa</option>
                <option value="HOSTEL">Hostel</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giá tối thiểu
              </label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giá tối đa
              </label>
              <input
                type="number"
                placeholder="10000000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số khách
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleFilterChange('guests', e.target.value ? Number(e.target.value) : undefined)}
              >
                <option value="">Không giới hạn</option>
                <option value="1">1 khách</option>
                <option value="2">2 khách</option>
                <option value="3">3 khách</option>
                <option value="4">4 khách</option>
                <option value="5">5+ khách</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Đang tải danh sách chỗ ở...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Không tìm thấy chỗ ở nào
            </h3>
            <p className="text-gray-600">
              Thử thay đổi bộ lọc để xem thêm kết quả
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const getTypeLabel = (type: string) => {
    const typeMap: { [key: string]: string } = {
      APARTMENT: 'Căn hộ',
      HOUSE: 'Nhà riêng', 
      HOTEL: 'Khách sạn',
      VILLA: 'Villa',
      HOSTEL: 'Hostel'
    };
    return typeMap[type] || type;
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-200 cursor-pointer">
      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative">
        <div className="absolute top-2 right-2">
          <button className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition duration-200">
            ❤️
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate flex-1 mr-2">
            {listing.title}
          </h3>
          <div className="flex items-center">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm text-gray-600 ml-1">
              {listing.averageRating ? listing.averageRating.toFixed(1) : 'Mới'}
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-2">
          {listing.city}, {listing.country} • {getTypeLabel(listing.type)}
        </p>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <span className="mr-4">👥 {listing.maxGuests} khách</span>
          <span className="mr-4">🛏️ {listing.bedrooms} PN</span>
          <span>🛁 {listing.bathrooms} PT</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(listing.pricePerNight)} ₫
            </span>
            <span className="text-gray-600">/đêm</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200">
            Đặt phòng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;