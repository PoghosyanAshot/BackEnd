BEGIN;

CREATE INDEX IF NOT EXISTS idx_accounts_customer_id
ON accounts(customer_id);

CREATE INDEX IF NOT EXISTS idx_transactions_from_account
ON transactions(from_account_id);

CREATE INDEX IF NOT EXISTS idx_transactions_to_account
ON transactions(to_account_id);

CREATE INDEX IF NOT EXISTS idx_transactions_created_at
ON transactions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at
ON audit_logs(created_at DESC);

COMMIT;