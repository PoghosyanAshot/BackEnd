ALTER TABLE accounts
DROP CONSTRAINT IF EXISTS balance_not_negative;

ALTER TABLE accounts
ADD CONSTRAINT balance_not_negative CHECK (balance >= 0);