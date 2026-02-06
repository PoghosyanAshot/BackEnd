-- Drop tables
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS reservation_seats;
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS seats;
DROP TABLE IF EXISTS screenings;
DROP TABLE IF EXISTS halls;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;

-- USERS 
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- MOVIES
CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  duration_minutes INT NOT NULL,
  release_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- HALLS
CREATE TABLE halls (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- SEATS
CREATE TABLE seats (
  id SERIAL PRIMARY KEY,
  hall_id INT NOT NULL REFERENCES halls(id) ON DELETE CASCADE,
  seat_number TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  UNIQUE (hall_id, seat_number)
);

-- SCREENINGS
CREATE TABLE screenings (
  id SERIAL PRIMARY KEY,
  movie_id INT NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  hall_id INT NOT NULL REFERENCES halls(id) ON DELETE CASCADE,
  start_time TIMESTAMP NOT NULL
);

-- RESERVATIONS
CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  screening_id INT NOT NULL REFERENCES screenings(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- RESERVATION_SEATS (JUNCTION TABLE)
CREATE TABLE reservation_seats (
  reservation_id INT NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
  seat_id INT NOT NULL REFERENCES seats(id) ON DELETE CASCADE,
  PRIMARY KEY (reservation_id, seat_id)
);

-- PAYMENTS (1:1 with reservations)
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  reservation_id INT UNIQUE NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  paid_at TIMESTAMP
);