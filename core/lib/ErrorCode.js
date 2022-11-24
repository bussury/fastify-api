const SERVER = { description: 'Server error occurred', status: 500, code: 'SERVER_ERROR' }
const EXTERNAL = { description: 'External service error', status: 500, code: 'EXTERNAL_ERROR' }
const DEV_IMPLEMENTATION = { description: 'Development implementation error', status: 500, code: 'DEV_IMPLEMENTATION_ERROR' }
const NO_ARGUMENT = { description: 'Required arguments not supplied', status: 500, code: 'NO_ARGUMENT_ERROR' }
const ARGUMENT_TYPE = { description: 'Wrong argument type', status: 500, code: 'ARGUMENT_TYPE_ERROR' }
const BAD_REQUEST = { description: 'Bad request', status: 400, code: 'BAD_REQUEST_ERROR' }
const EMPTY_BODY = { description: 'Empty body is not allowed. Please fill the body', status: 400, code: 'EMPTY_BODY_ERROR' }
const VALIDATION = { description: 'Invalid request', status: 400, code: 'VALIDATION_ERROR' }
const ALERT = { message: 'Operation forbidden by security policy', status: 418, code: 'ALERT_ERROR' }
const FORBIDDEN = { description: 'Access forbidden', status: 403, code: 'FORBIDDEN_ERROR' }
const NO_ANONYMOUS_ACCESS = { description: 'Access denied. No anonymous access', status: 403, code: 'NO_ANONYMOUS_ACCESS_ERROR' }
const BAD_ROLE = { description: 'Bad role', status: 403, code: 'BAD_ROLE_ERROR' }
const INVALID_CREDENTIALS = { description: 'Invalid credentials', status: 403, code: 'INVALID_CREDENTIALS_ERROR' }
const INVALID_PASSWORD = { description: 'Invalid password', status: 403, code: 'INVALID_PASSWORD_ERROR' }
const TOKEN_EXPIRED = { description: 'Token expired', status: 419, code: 'TOKEN_EXPIRED_ERROR' }
const SESSION_EXPIRED = { description: 'Session(refresh token) expired', status: 419, code: 'SESSION_EXPIRED_ERROR' }
const INVALID_REFRESH_SESSION = { description: 'Invalid session. Wrong fingerprint', status: 401, code: 'INVALID_REFRESH_SESSION_ERROR' }
const TOKEN_NOT_SIGNED = { description: 'Token not signed', status: 500, code: 'TOKEN_NOT_SIGNED_ERROR' }
const TOKEN_VERIFY = { description: 'Token verify error', status: 401, code: 'TOKEN_VERIFY_ERROR' }
const BAD_REFRESH_TOKEN = { description: 'Bad Refresh token', status: 401, code: 'BAD_REFRESH_TOKEN_ERROR' }
const WRONG_RESET_PASSWORD_TOKEN = { description: 'Reset password token is not registered. Probably it already used', status: 401, code: 'WRONG_RESET_PASSWORD_TOKEN_ERROR' }
const WRONG_EMAIL_CONFIRM_TOKEN = { description: 'Confirm email token is not registered. Probably it already used', status: 401, code: 'WRONG_EMAIL_CONFIRM_TOKEN_ERROR' }
const PARSE_TOKEN = { description: 'Trying get data from access token. Something wrong', status: 401, code: 'PARSE_TOKEN_ERROR' }
const EMAIL_ALREADY_TAKEN = { description: 'This email already taken, try use another', status: 409, code: 'EMAIL_ALREADY_TAKEN_ERROR' }
const SEND_EMAIL = { description: 'Send email error', status: 500, code: 'SEND_EMAIL_ERROR' }
const DECRYPTION = { description: 'Decryption error', status: 500, code: 'DECRYPTION_ERROR' }
const ROUTE_NOT_FOUND = { description: 'Route not found', status: 404, code: 'ROUTE_NOT_FOUND_ERROR' }
const NOT_FOUND = { description: 'Empty response, not found', status: 404, code: 'NOT_FOUND_ERROR' }
const UNPROCESSABLE_ENTITY = { description: 'Unprocessable entity', status: 422, code: 'UNPROCESSABLE_ENTITY_ERROR' }
const DB_DUPLICATE_CONFLICT = { description: 'Duplicate conflict. Resource already exists', status: 409, code: 'DB_DUPLICATE_CONFLICT_ERROR' }
const DB_NOTNULL_CONFLICT = { description: 'Not null conflict', status: 500, code: 'DB_NOTNULL_CONFLICT_ERROR' }
const DB = { description: 'Database error occurred', status: 500, code: 'DB_ERROR' }

export default{
    SERVER,
    EXTERNAL,
    DEV_IMPLEMENTATION,
    NO_ARGUMENT,
    ARGUMENT_TYPE,
    BAD_REQUEST,
    EMPTY_BODY,
    VALIDATION,
    ALERT,
    FORBIDDEN,
    NO_ANONYMOUS_ACCESS,
    BAD_ROLE,
    INVALID_CREDENTIALS,
    INVALID_PASSWORD,
    TOKEN_EXPIRED,
    SESSION_EXPIRED,
    INVALID_REFRESH_SESSION,
    TOKEN_NOT_SIGNED,
    TOKEN_VERIFY,
    BAD_REFRESH_TOKEN,
    WRONG_RESET_PASSWORD_TOKEN,
    WRONG_EMAIL_CONFIRM_TOKEN,
    PARSE_TOKEN,
    EMAIL_ALREADY_TAKEN,
    SEND_EMAIL,
    DECRYPTION,
    ROUTE_NOT_FOUND,
    NOT_FOUND,
    UNPROCESSABLE_ENTITY,
    DB_DUPLICATE_CONFLICT,
    DB_NOTNULL_CONFLICT,
    DB

}    
    
