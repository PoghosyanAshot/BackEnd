-- 1. INNER JOIN
-- Reservations that belong to registered users only (no guests)
SELECT 
  r.id AS reservation_id,
  u.full_name,
  m.title,
  s.start_time
FROM reservations r
INNER JOIN users u ON u.id = r.user_id
JOIN screenings s ON s.id = r.screening_id
JOIN movies m ON m.id = s.movie_id;


-- 2. LEFT JOIN
-- All users, even those without reservations
SELECT 
  u.id,
  u.full_name,
  r.id AS reservation_id
FROM users u
LEFT JOIN reservations r ON r.user_id = u.id;


-- 3. RIGHT JOIN
-- All reservations, including guest reservations
SELECT 
  r.id AS reservation_id,
  u.full_name
FROM users u
RIGHT JOIN reservations r ON r.user_id = u.id;


-- 4. FULL OUTER JOIN
-- All users and all reservations together
SELECT 
  u.full_name,
  r.id AS reservation_id
FROM users u
FULL OUTER JOIN reservations r ON r.user_id = u.id;


-- 5. Many-to-Many JOIN
-- Reservation -> reservation_seats -> seats
SELECT 
  r.id AS reservation_id,
  se.seat_number,
  h.name AS hall_name
FROM reservations r
JOIN reservation_seats rs ON rs.reservation_id = r.id
JOIN seats se ON se.id = rs.seat_id
JOIN halls h ON h.id = se.hall_id;


-- 6. One-to-One JOIN
-- Reservation with payment (paid only)
SELECT 
  r.id AS reservation_id,
  p.amount,
  p.paid_at
FROM reservations r
JOIN payments p ON p.reservation_id = r.id;


-- 7. One-to-One with LEFT JOIN
-- Show also unpaid reservations
SELECT 
  r.id AS reservation_id,
  p.amount,
  p.paid_at
FROM reservations r
LEFT JOIN payments p ON p.reservation_id = r.id;


-- 8. Movie-based JOIN
-- Movies -> screenings -> reservations
SELECT 
  m.title,
  s.start_time,
  r.id AS reservation_id
FROM movies m
JOIN screenings s ON s.movie_id = m.id
LEFT JOIN reservations r ON r.screening_id = s.id;


-- 9. Guest reservations only
-- Reservations where user_id is NULL
SELECT 
  r.id AS reservation_id,
  r.created_at
FROM reservations r
WHERE r.user_id IS NULL;


-- 10. Users with more than 1 reservation
SELECT 
  u.full_name,
  COUNT(r.id) AS reservation_count
FROM users u
JOIN reservations r ON r.user_id = u.id
GROUP BY u.full_name
HAVING COUNT(r.id) > 1;


-- 11. Seats used multiple times
-- Seats that appear in 3+ reservations
SELECT 
  se.seat_number,
  COUNT(rs.reservation_id) AS times_used
FROM seats se
JOIN reservation_seats rs ON rs.seat_id = se.id
GROUP BY se.seat_number
HAVING COUNT(rs.reservation_id) >= 3;


-- 12. Screenings with no reservations
SELECT 
  s.id,
  m.title,
  s.start_time
FROM screenings s
LEFT JOIN reservations r ON r.screening_id = s.id
JOIN movies m ON m.id = s.movie_id
WHERE r.id IS NULL;