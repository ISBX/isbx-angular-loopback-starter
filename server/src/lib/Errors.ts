
class StatusCodeError extends Error {
  public status: number;
  public statusCode: number;
}

export class Errors {
  public static messages = {
    // Account
    ERROR_LOGIN_FAILED: 'Login failed',
    ERROR_EMAIL_INVALID: 'Must provide a valid email',
    ERROR_EMAIL_EXISTS: 'An account with this email address exists already',
    ERROR_PASSWORD_NOT_MATCH: 'Passwords do not match.',
    ERROR_PASSWORD_RESET_REQUEST: 'Unable to send an email for reset password.',
    ERROR_ACCOUNT_ACTIVATION: 'Unable to send an email for account activation.',

    // General
    ERROR_MESSAGE_FORBIDDEN: 'Action not allowed',
    ERROR_UNAUTHORIZED: 'Unauthorized',
    ERROR_NOT_FOUND: 'Not found.'
  };

  public static makeError(messageCode: string, statusCode?: number, stack?: string) {
    stack = stack || '';
    statusCode = statusCode || 400;
    const error = new StatusCodeError(Errors.messages[messageCode]);
    error.status = statusCode;
    error.statusCode = statusCode;
    error.stack = stack;
    return error;
  }
}
