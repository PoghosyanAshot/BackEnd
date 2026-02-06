CREATE INDEX IF NOT EXISTS idx_accounts_customer
ON accounts(customer_id);

CREATE INDEX IF NOT EXISTS idx_transactions_from
ON transactions(from_account_id);

CREATE INDEX IF NOT EXISTS idx_transactions_to
ON transactions(to_account_id);

CREATE INDEX IF NOT EXISTS idx_transactions_created
ON transactions(created_at);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created
ON audit_logs(created_at);
