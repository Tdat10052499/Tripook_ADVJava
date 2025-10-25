export interface User {
  id?: number;
  email: string;
  fullName: string;
  phone?: string;
  role: 'CUSTOMER' | 'PROVIDER' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Listing {
  id?: number;
  providerId: number;
  provider?: User;
  title: string;
  description?: string;
  type: 'ROOM' | 'APARTMENT' | 'HOUSE' | 'VILLA';
  address: string;
  city: string;
  latitude?: number;
  longitude?: number;
  pricePerNight: number;
  maxGuests: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Booking {
  id?: number;
  customerId: number;
  customer?: User;
  listingId: number;
  listing?: Listing;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED' | 'FAILED';
  specialRequests?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Payment {
  id?: number;
  bookingId: number;
  booking?: Booking;
  amount: number;
  method: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL' | 'BANK_TRANSFER';
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  transactionId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Favorite {
  id?: number;
  userId: number;
  user?: User;
  listingId: number;
  listing?: Listing;
  createdAt?: string;
}

export interface Image {
  id?: number;
  listingId: number;
  listing?: Listing;
  imageUrl: string;
  isPrimary: boolean;
  caption?: string;
  createdAt?: string;
}

export interface Review {
  id?: number;
  bookingId: number;
  booking?: Booking;
  rating: number;
  comment?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  role: 'CUSTOMER' | 'PROVIDER';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface SearchFilters {
  city?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  maxGuests?: number;
  checkInDate?: string;
  checkOutDate?: string;
}
