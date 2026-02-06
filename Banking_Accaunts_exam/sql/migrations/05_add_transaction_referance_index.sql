BEGIN;

CREATE UNIQUE INDEX IF NOT EXISTS idx_transactions_reference
ON transactions(reference);

COMMIT;