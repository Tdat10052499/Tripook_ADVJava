-- Migration to new booking system schema
-- Drop old tables and create new ones

-- Drop existing tables in correct order (respecting foreign keys)
DROP TABLE IF EXISTS trip_reviews CASCADE;
DROP TABLE IF EXISTS trip_activities CASCADE;
DROP TABLE IF EXISTS trips CASCADE;
DROP TABLE IF EXISTS destinations CASCADE;

-- Update users table structure
ALTER TABLE users DROP COLUMN IF EXISTS username CASCADE;
ALTER TABLE users DROP COLUMN IF EXISTS avatar_url CASCADE;
ALTER TABLE users DROP COLUMN IF EXISTS is_active CASCADE;
ALTER TABLE users DROP COLUMN IF EXISTS updated_at CASCADE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'ACTIVE';

-- Create Listings table
CREATE TABLE listings (
    id BIGSERIAL PRIMARY KEY,
    provider_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    type VARCHAR(50),
    address VARCHAR(500),
    city VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    price_per_night DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'VND',
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Images table
CREATE TABLE images (
    id BIGSERIAL PRIMARY KEY,
    listing_id BIGINT REFERENCES listings(id) ON DELETE CASCADE,
    url VARCHAR(500) NOT NULL,
    position INTEGER DEFAULT 0
);

-- Create Payments table
CREATE TABLE payments (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT, -- Will be linked after bookings table is created
    gateway VARCHAR(50),
    amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'VND',
    status VARCHAR(20) DEFAULT 'PENDING',
    transaction_code VARCHAR(100),
    callback_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Bookings table
CREATE TABLE bookings (
    id BIGSERIAL PRIMARY KEY,
    customer_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    listing_id BIGINT REFERENCES listings(id) ON DELETE CASCADE,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    total_price DECIMAL(12, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_id BIGINT REFERENCES payments(id)
);

-- Add foreign key constraint for payments.booking_id
ALTER TABLE payments ADD CONSTRAINT fk_payments_booking 
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE;

-- Create Favorites table
CREATE TABLE favorites (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    listing_id BIGINT REFERENCES listings(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, listing_id)
);

-- Create Reviews table
CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY,
    listing_id BIGINT REFERENCES listings(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_listings_provider_id ON listings(provider_id);
CREATE INDEX idx_listings_city ON listings(city);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX idx_bookings_listing_id ON bookings(listing_id);
CREATE INDEX idx_bookings_dates ON bookings(check_in_date, check_out_date);
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_favorites_listing_id ON favorites(listing_id);
CREATE INDEX idx_reviews_listing_id ON reviews(listing_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_images_listing_id ON images(listing_id);