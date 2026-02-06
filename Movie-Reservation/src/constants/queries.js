"use strict";

const QUERIES = Object.freeze({
    // JOIN QUERIES

    // Reservation details with user, movie, screening
    RESERVATION_DETAILS: `
    SELECT 
      r.id AS reservation_id,
      u.full_name AS user_name,
      m.title AS movie_title,
      s.start_time,
      r.created_at
    FROM reservations r
    LEFT JOIN users u ON u.id = r.user_id
    JOIN screenings s ON s.id = r.screening_id
    JOIN movies m ON m.id = s.movie_id
  `,

    // Reservation -> seats (many-to-many)
    RESERVATION_SEATS: `
    SELECT 
      r.id AS reservation_id,
      se.seat_number,
      h.name AS hall_name
    FROM reservation_seats rs
    JOIN reservations r ON r.id = rs.reservation_id
    JOIN seats se ON se.id = rs.seat_id
    JOIN halls h ON h.id = se.hall_id
  `,

    // Movies with screenings count
    MOVIES_WITH_SCREENINGS: `
    SELECT 
      m.id,
      m.title,
      COUNT(s.id) AS screenings_count
    FROM movies m
    LEFT JOIN screenings s ON s.movie_id = m.id
    GROUP BY m.id, m.title
  `,

    // Users with reservation count
    USERS_WITH_RESERVATIONS: `
    SELECT 
      u.id,
      u.full_name,
      COUNT(r.id) AS reservations_count
    FROM users u
    LEFT JOIN reservations r ON r.user_id = u.id
    GROUP BY u.id, u.full_name
  `,

    // REPORT QUERIES

    // Total price per reservation
    TOTAL_PRICE_PER_RESERVATION: `
    SELECT 
      r.id AS reservation_id,
      SUM(se.price) AS total_price
    FROM reservations r
    JOIN reservation_seats rs ON rs.reservation_id = r.id
    JOIN seats se ON se.id = rs.seat_id
    GROUP BY r.id
  `,

    // Total revenue per movie
    TOTAL_REVENUE_PER_MOVIE: `
    SELECT 
      m.title,
      SUM(se.price) AS total_revenue
    FROM movies m
    JOIN screenings s ON s.movie_id = m.id
    JOIN reservations r ON r.screening_id = s.id
    JOIN reservation_seats rs ON rs.reservation_id = r.id
    JOIN seats se ON se.id = rs.seat_id
    GROUP BY m.title
  `,

    // Most popular movies by seat count
    MOST_POPULAR_MOVIES: `
    SELECT 
      m.title,
      COUNT(rs.seat_id) AS seats_sold
    FROM movies m
    JOIN screenings s ON s.movie_id = m.id
    JOIN reservations r ON r.screening_id = s.id
    JOIN reservation_seats rs ON rs.reservation_id = r.id
    GROUP BY m.title
    ORDER BY seats_sold DESC
  `,

    // Unpaid reservations (anti-join)
    UNPAID_RESERVATIONS: `
    SELECT 
      r.id,
      r.created_at
    FROM reservations r
    LEFT JOIN payments p ON p.reservation_id = r.id
    WHERE p.id IS NULL
  `,
});
