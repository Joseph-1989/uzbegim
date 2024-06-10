export enum HttpCode {
  // 1xx Informational Response: The request has been received, continuing processiong.
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,

  // 2xx Successful: The request was successfully received, understood, and is being processed.
  OK = 200, // The request has succeeded.
  CREATED = 201, // The request has been fulfilled and resulted in one or more new resources being created.
  ACCEPTED = 202, // The request has been accepted for processing, but the processing has not been completed.
  NO_CONTENT = 204, // The server successfully processed the request and is not returning any content.
  NETWORK_ERROR = 204, // No data returned to client (Used in response to DELETE requests).
  PARSE_ERROR = 226, // Returned by the server when it could not understand the request due to invalid syntax or parameter name or value pair
  NOT_MODIFIED = 304, // The requested resource has not been modified since the last request.
  BAD_REQUEST = 400, // The server could not understand the request due to invalid syntax.
  UNAUTHORIZED = 401, // Operator does not have access to the specified resource.
  FORBIDDEN = 403, // Server understood the request, but it refuses to authorize it.
  NOT_FOUND = 404, // The requested resource could not be found.
  METHOD_NOT_ALLOWED = 405, // The method specified in the Request-Line is not allowed for the target resource.
  TIMEOUT_ERROR = 408, // Used when the server does not receive a request from the client within the time that it expects the request to
  CONFLICT = 409, // The request conflict with current data.
  GONE = 410, // The requested resource is no longer available at    the server and there is no forwarding address.
  PRECONDITION_FAILED = 412, // The request failed because it did not meet one of the preconditions that is associated with
  TOO_MANY_ATTEMPTS_TRY_LATER = 429, // Too many requests hit the API too quickly.
  INTERNAL_SERVER_ERROR = 500, // Generic error message.
}

export enum Message {
  ADMIN_RIGHTS_REQUIRED = "You don't have the rights to do that.",
  AUTH_REQUIRED = "Authorization required",
  BLOCKED_USER = "The user is blocked, contact restaurant",
  CANNOT_DELETE_OWN_ACCOUNT = "You cannot delete your  own account.",
  COMMENT_DOES_NOT_EXIST = "The comment you are trying to interact with doesn't exist.",
  EMAIL_TAKEN = "That email address is already taken. Please choose another.",
  FIELD_CANT_BE_BLANK = "{field} can't be blank.",
  IMAGE_UPLOAD_FAILED = "Image upload failed.",
  INVALID_PASSWORD = "Invalid password. Password must contain at least 8 characters including one uppercase letter, one lowercase letter",
  INVALID_AUTHENTICATION = "Invalid authorization token provided.",
  CATEGORY_DOES_NOT_EXIST = "Category does not exist.",
  COMMENT_NOT_FOUND = "Comment not found.",
  CONFLICT = `Conflict: the current state conflicts with the desired state`,
  CREATE_FAILED = "Create is failed.",
  EMAIL_EXISTS = "This email is already in use. Please provide a different one.",
  FORBIDDEN = `Forbidden: you don't have permission to do this operation`,
  INCORRECT_PASSWORD_CONFIRMATION = "Passwords did not match.",
  INCORRECT_PASSWORD_CURRENT = "Current password incorrect.",
  INCORRECT_PASSWORD_NEW = "New password should be different than the current one.",
  INTERNAL_SERVER_ERROR = `Internal Server Error`,
  ITEM_NOT_FOUND = "Item not found.",
  LOGIN_REQUIRED = "You must be logged in to perform this action.",
  MAXIMUM_ITEMS_REACHED = "Maximum number of items reached for this category.",
  MULTIPLE_RESULTS = "Multiple records matched query parameters.",
  NETWORK_ERROR = "Network Error",
  NO_DATA_FOUND = "No Data Is Found",
  NO_MEMBER_NICK = "No member with that member nick.",
  NOT_AUTHENTICATED = "You are not authenticated, please login first!",
  NOT_FOUND = "Resource not found.",
  NOT_FOUND_REQUEST = `Resource not found: the server couldn't find the requested resource. It may be doing something wrong.`,
  ONE_RESULT = "One record matched query parameters.",
  ONLY_OWNER_CAN_DELETE = "Only the owner of the item can delete it.",
  PARSE_ERROR = "Parse error",
  PARAMETER_MISSING = "Parameter missing from request.",
  PARAMETERS_MISSING = "Parameters missing from request",
  PASSWORD_CHANGED = "Password successfully changed!",
  PROFILE_UPDATED = "Profile successfully updated!",
  RECORD_DELETED = "Record deleted successfully",
  SERVER_ERROR = "Internal server error.",
  SOMETHING_WENT_WRONG = "Something went wrong",
  SUCCESSFULLY_CREATED = "Successfully created new item.",
  TIMEOUT_ERROR = "Timeout Error",
  TOO_MANY_ATTEMPTS_TRY_LATER = "Too many failed attempts. Try again later.",
  UNAUTHORIZED = `Unauthorized: please login first`,
  UPDATE_FAILED = "Update is failed.",
  USED_NICK_PHONE = "You are inserting already used nickname or phone number.",
  USERNAME_TAKEN = "Username already taken. Please try another one.",
  USER_NOT_AUTHORIZED = "User is not authorized to perform this action.",
  WRONG_CREDENTIALS = "Incorrect username or password.",
  WRONG_PASSWORD = "Wrong password, please try again.",
  ZERO_RESULTS = "No records match query parameters.",
  TOKEN_CREATION_FAILED = "Token creation error!",
}

class Errors extends Error {
  public message: Message;
  public code: HttpCode;

  static standard = {
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: Message.SOMETHING_WENT_WRONG,
  };
  constructor(statusCode?: HttpCode, statusMessage?: Message) {
    super();
    this.code = statusCode || HttpCode.INTERNAL_SERVER_ERROR;
    this.message = statusMessage || Message.SOMETHING_WENT_WRONG;
  }
}

export default Errors;
