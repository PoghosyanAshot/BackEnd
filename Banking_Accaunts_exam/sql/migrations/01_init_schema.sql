BEGIN;

-- Customers
CREATE TABLE IF NOT EXISTS customers (
    id BIGSERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Accounts
CREATE TABLE IF NOT EXISTS accounts (
    id BIGSERIAL PRIMARY KEY,

    customer_id BIGINT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,

    currency TEXT NOT NULL CHECK (
        currency IN ('AMD','USD','EUR')
    ),

    balance BIGINT NOT NULL DEFAULT 0 CHECK (balance >= 0),

    status TEXT NOT NULL DEFAULT 'active' CHECK (
        status IN ('active','frozen','closed')
    ),

    created_at TIMESTAMP DEFAULT NOW()
);

-- Transactions
CREATE TABLE IF NOT EXISTS transactions (
    id BIGSERIAL PRIMARY KEY,

    type TEXT NOT NULL CHECK (
        type IN ('deposit','withdraw','transfer')
    ),

    from_account_id BIGINT REFERENCES accounts(id),
    to_account_id BIGINT REFERENCES accounts(id),

    amount BIGINT NOT NULL CHECK (amount > 0),

    reference TEXT NOT NULL UNIQUE,

    note TEXT,

    created_at TIMESTAMP DEFAULT NOW(),

    CHECK (
        (type = 'deposit' AND from_account_id IS NULL AND to_account_id IS NOT NULL)
        OR
        (type = 'withdraw' AND from_account_id IS NOT NULL AND to_account_id IS NULL)
        OR
        (type = 'transfer' AND from_account_id IS NOT NULL AND to_account_id IS NOT NULL AND from_account_id <> to_account_id)
    )
);

-- Audit logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGSERIAL PRIMARY KEY,
    action TEXT NOT NULL,
    meta JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

COMMIT;