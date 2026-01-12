const RESPONSE_MESSAGES = Object.freeze({
    // Generic success
    OK: "OK",
    CREATED: "Created successfully",
    UPDATED: "Updated successfully",
    DELETED: "Deleted successfully",

    // Auth success
    REGISTER_SUCCESS: "User registered successfully",
    LOGIN_SUCCESS: "Login successful",

    // Products success
    PRODUCT_CREATED: "Product created successfully",
    PRODUCT_UPDATED: "Product updated successfully",
    PRODUCT_DELETED: "Product deleted successfully",

    // Orders success
    ORDER_CREATED: "Order created successfully",

    // Generic errors
    ROUTE_NOT_FOUND: "Route not found",
    INTERNAL_ERROR: "Internal server error",
    VALIDATION_ERROR: "Validation error",
    JSON_STORE_ERROR: "Data store error",

    // Auth errors
    EMAIL_ALREADY_EXISTS: "Email already exists",
    INVALID_CREDENTIALS: "Invalid email or password",
    INVALID_EMAIL: "Invalid email format",
    INVALID_PASSWORD: "Invalid password format",
    MISSING_AUTH_HEADER: "Missing Authorization header",
    INVALID_AUTH_SCHEME: "Authorization header must start with 'Bearer'",
    INVALID_TOKEN: "Invalid token",
    TOKEN_EXPIRED: "Token expired",

    // Role / Access errors
    FORBIDDEN_ROLE: "You don't have permission to perform this action",

    // Product errors
    PRODUCT_NOT_FOUND: "Product not found",
    INVALID_PRODUCT_ID: "Invalid product id",
    INVALID_PRODUCT_DATA: "Invalid product data",
    INVALID_NAME: "Invalid name",
    INVALID_PRICE: "Invalid price",
    INVALID_STOCK: "Invalid stock value",
    STOCK_BELOW_ZERO: "Stock cannot be below 0",

    // Order errors
    INVALID_ORDER_DATA: "Invalid order data",
    EMPTY_ORDER_ITEMS: "Order items must not be empty",
    INVALID_TYPE_ITEMS: "Itmes must be array",
    INVALID_QUANTITY: "Invalid quantity",
    ORDER_NOT_FOUND: "Order not found",
    INSUFFICIENT_STOCK: "Insufficient stock",
    ATOMIC_WRITE_FAILED: "Atomic write failed: no data was saved",
});

module.exports = RESPONSE_MESSAGES;
