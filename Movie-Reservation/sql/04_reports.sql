-- 1. Total price per reservation
-- Each reservation total amount (sum of its seats)
SELECT 
  r.id AS reservation_id,
  SUM(se.price) AS total_price
FROM reservations r
JOIN reservation_seats rs ON rs.reservation_id = r.id
JOIN seats se ON se.id = rs.seat_id
GROUP BY r.id
ORDER BY r.id;


-- 2. Total revenue per movie
-- How much money each movie has generated
SELECT 
  m.title AS movie_title,
  SUM(se.price) AS total_revenue
FROM movies m
JOIN screenings s ON s.movie_id = m.id
JOIN reservations r ON r.screening_id = s.id
JOIN reservation_seats rs ON rs.reservation_id = r.id
JOIN seats se ON se.id = rs.seat_id
GROUP BY m.title
ORDER BY total_revenue DESC;


-- 3. Reservation count per user
-- How many reservations each user has
SELECT 
  u.full_name,
  COUNT(r.id) AS reservation_count
FROM users u
LEFT JOIN reservations r ON r.user_id = u.id
GROUP BY u.full_name
ORDER BY reservation_count DESC;


-- 4. Most popular movies (by seat count)
-- Movies ordered by how many seats were sold
SELECT 
  m.title AS movie_title,
  COUNT(rs.seat_id) AS seats_sold
FROM movies m
JOIN screenings s ON s.movie_id = m.id
JOIN reservations r ON r.screening_id = s.id
JOIN reservation_seats rs ON rs.reservation_id = r.id
GROUP BY m.title
ORDER BY seats_sold DESC;


-- 5. Unpaid reservations (anti-join)
-- Reservations that do not have a payment
SELECT 
  r.id AS reservation_id,
  r.created_at
FROM reservations r
LEFT JOIN payments p ON p.reservation_id = r.id
WHERE p.id IS NULL
ORDER BY r.id;


-- 6. Revenue per hall
-- How much money each hall has generated
SELECT 
  h.name AS hall_name,
  SUM(se.price) AS total_revenue
FROM halls h
JOIN seats se ON se.hall_id = h.id
JOIN reservation_seats rs ON rs.seat_id = se.id
GROUP BY h.name
ORDER BY total_revenue DESC;


-- 7. Average ticket price per movie
-- Average seat price sold for each movie
SELECT 
  m.title AS movie_title,
  AVG(se.price) AS avg_ticket_price
FROM movies m
JOIN screenings s ON s.movie_id = m.id
JOIN reservations r ON r.screening_id = s.id
JOIN reservation_seats rs ON rs.reservation_id = r.id
JOIN seats se ON se.id = rs.seat_id
GROUP BY m.title;


-- 8. Daily revenue
-- How much revenue per day
SELECT 
  DATE(r.created_at) AS day,
  SUM(se.price) AS daily_revenue
FROM reservations r
JOIN reservation_seats rs ON rs.reservation_id = r.id
JOIN seats se ON se.id = rs.seat_id
GROUP BY DATE(r.created_at)
ORDER BY day;