-- USERS
INSERT INTO users (full_name, email, password_hash) VALUES
('Alice Modrich', 'alice@test.com', 'hash1'),
('Bob Smith', 'bob@test.com', 'hash2'),
('Charlie Brown', 'charlie@test.com', 'hash3'),
('Diana Prince', 'diana@test.com', 'hash4'),
('Ethan Hunt', 'ethan@test.com', 'hash5'); -- Ethan will have zero reservations

-- MOVIES
INSERT INTO movies (title, description, duration_minutes, release_date) VALUES
('The Matrix', 'Sci-fi action', 136, '1999-03-31'),
('Inception', 'Dream within a dream', 148, '2010-07-16'),
('Interstellar', 'Space exploration', 169, '2014-11-07'),
('The Godfather', 'Mafia drama', 175, '1972-03-24');

-- HALLS
INSERT INTO halls (name) VALUES
('Hall A'),
('Hall B');

-- SEATS
-- Hall A seats
INSERT INTO seats (hall_id, seat_number, price) VALUES
(1, 'A1', 10.00),
(1, 'A2', 10.00),
(1, 'A3', 10.00),
(1, 'A4', 10.00),
(1, 'A5', 10.00),
(1, 'A6', 10.00);

-- Hall B seats
INSERT INTO seats (hall_id, seat_number, price) VALUES
(2, 'B1', 12.00),
(2, 'B2', 12.00),
(2, 'B3', 12.00),
(2, 'B4', 12.00),
(2, 'B5', 12.00),
(2, 'B6', 12.00);

-- SCREENINGS
INSERT INTO screenings (movie_id, hall_id, start_time) VALUES
(1, 1, '2026-02-05T18:00:00'),
(1, 2, '2026-02-06T20:00:00'), -- Matrix has 2 screenings
(2, 1, '2026-02-05T19:00:00'),
(2, 2, '2026-02-06T21:00:00'),
(3, 1, '2026-02-07T18:30:00'),
(4, 2, '2026-02-07T20:30:00');

-- RESERVATIONS
INSERT INTO reservations (user_id, screening_id) VALUES
(1, 1),  -- Alice
(1, 2),  -- Alice has 2
(2, 3),  -- Bob
(2, 4),  -- Bob has 2
(3, 5),  -- Charlie
(NULL, 6), -- Guest reservation
(4, 1),  -- Diana
(4, 3);  -- Diana has 2

-- RESERVATION_SEATS
-- Reservation 1
INSERT INTO reservation_seats VALUES (1, 1), (1, 2);

-- Reservation 2
INSERT INTO reservation_seats VALUES (2, 1), (2, 3);

-- Reservation 3
INSERT INTO reservation_seats VALUES (3, 1), (3, 4);

-- Reservation 4
INSERT INTO reservation_seats VALUES (4, 2), (4, 5);

-- Reservation 5
INSERT INTO reservation_seats VALUES (5, 3), (5, 6);

-- Reservation 6 (guest)
INSERT INTO reservation_seats VALUES (6, 1), (6, 2);

-- Reservation 7
INSERT INTO reservation_seats VALUES (7, 1), (7, 3);

-- Reservation 8
INSERT INTO reservation_seats VALUES (8, 4), (8, 5);

-- Seat 1 appears in 5 reservations ✔

-- PAYMENTS
INSERT INTO payments (reservation_id, amount, paid_at) VALUES
(1, 20.00, '2026-02-01T10:00:00'),
(2, 20.00, '2026-02-01T11:00:00'),
(3, 20.00, '2026-02-01T12:00:00');

-- Unpaid: reservations 4,5,6,7,8