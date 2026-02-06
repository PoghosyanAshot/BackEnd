TRUNCATE TABLE audit_logs RESTART IDENTITY CASCADE;
TRUNCATE TABLE transactions RESTART IDENTITY CASCADE;
TRUNCATE TABLE accounts RESTART IDENTITY CASCADE;
TRUNCATE TABLE customers RESTART IDENTITY CASCADE;

INSERT INTO customers(full_name,email,phone)
VALUES
('User1','user1@example.com','111111'),
('User2','user2@example.com','222222');


INSERT INTO accounts(customer_id,currency,balance,status)
VALUES
(1,'AMD',100000,'active'),
(1,'USD',500,'active'),
(2,'EUR',300,'active');