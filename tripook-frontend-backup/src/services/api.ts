import axios from 'axios';
import { 
  User, 
  Listing, 
  Booking,
  Favorite, 
  Review, 
  AuthRequest, 
  RegisterRequest, 
  AuthResponse, 
  SearchFilters,
  ApiResponse 
} from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authApi = {
  login: (data: AuthRequest) => api.post<AuthResponse>('/auth/login', data),
  register: (data: RegisterRequest) => api.post<AuthResponse>('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get<User>('/auth/me'),
};

// Listings API
export const listingsApi = {
  getAll: (filters?: SearchFilters) => api.get<Listing[]>('/listings', { params: filters }),
  getById: (id: number) => api.get<Listing>(`/listings/${id}`),
  create: (data: Partial<Listing>) => api.post<Listing>('/listings', data),
  update: (id: number, data: Partial<Listing>) => api.put<Listing>(`/listings/${id}`, data),
  delete: (id: number) => api.delete(`/listings/${id}`),
  getByProvider: (providerId: number) => api.get<Listing[]>(`/listings/provider/${providerId}`),
};

// Bookings API
export const bookingsApi = {
  getAll: () => api.get<Booking[]>('/bookings'),
  getById: (id: number) => api.get<Booking>(`/bookings/${id}`),
  create: (data: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => api.post<Booking>('/bookings', data),
  cancel: (id: number) => api.patch(`/bookings/${id}/cancel`),
  getByCustomer: (customerId: number) => api.get<Booking[]>(`/bookings/customer/${customerId}`),
};

// Favorites API
export const favoritesApi = {
  getByUser: (userId: number) => api.get<Favorite[]>(`/favorites/user/${userId}`),
  add: (listingId: number) => api.post<Favorite>('/favorites', { listingId }),
  remove: (id: number) => api.delete(`/favorites/${id}`),
  toggle: (listingId: number) => api.post<{ isFavorite: boolean }>(`/favorites/toggle`, { listingId }),
};

// Reviews API
export const reviewsApi = {
  getByListing: (listingId: number) => api.get<Review[]>(`/reviews/listing/${listingId}`),
  create: (data: { listingId: number; rating: number; comment?: string }) => 
    api.post<Review>('/reviews', data),
  update: (id: number, data: Partial<Review>) => api.put<Review>(`/reviews/${id}`, data),
  delete: (id: number) => api.delete(`/reviews/${id}`),
};

export default api;
