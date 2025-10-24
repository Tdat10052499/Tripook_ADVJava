export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phone?: string;
  avatarUrl?: string;
  role: 'USER' | 'ADMIN';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Destination {
  id: number;
  name: string;
  description?: string;
  country: string;
  city: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface Trip {
  id: number;
  title: string;
  description?: string;
  user: User;
  destination: Destination;
  startDate: string;
  endDate: string;
  budget?: number;
  status: 'PLANNED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  activities?: TripActivity[];
  reviews?: TripReview[];
}

export interface TripActivity {
  id: number;
  trip: Trip;
  title: string;
  description?: string;
  location?: string;
  scheduledDate?: string;
  startTime?: string;
  endTime?: string;
  cost?: number;
  category?: string;
  createdAt: string;
}

export interface TripReview {
  id: number;
  trip: Trip;
  user: User;
  rating: number;
  comment?: string;
  createdAt: string;
}