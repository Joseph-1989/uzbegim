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
  NotFound = 404, // The requested resource could not be found.
  METHOD_NOT_ALLOWED = 405, // The method specified in the Request-Line is not allowed for the target resource.
  TIMOUT_ERROR = 408, // Used when the server does not receive a request from the client within the time that it expects the request to
  CONFLICT = 409, // The request conflict with current data.
  GONE = 410, // The requested resource is no longer available at    the server and there is no forwarding address.
  PRECONDITION_FAILED = 412, // The request failed because it did not meet one of the preconditions that is associated with
  TOO_MANY_ATTEMPTS_TRY_LATER = 429, // Too many requests hit the API too quickly.
  INTERNAL_SERVER_ERROR = 500, // Generic error message.
}

export enum Message {
  NO_DATA_FOUND = "No Data Found",
  CREATE_FAILED = "Failed to create record",
  UPDATE_FAILED = "Failed to update record",
  RECORD_DELETED = "Record deleted successfully",
  AUTH_REQUIRED = "Authorization required",
  PARAMETERS_MISSING = "Parameters missing from request",
  USER_NOT_AUTHORIZED = "User is not authorized to perform this action.",
  MULTIPLE_RESULTS = "Multiple records matched query parameters.",
  ONE_RESULT = "One record matched query parameters.",
  ZERO_RESULTS = "No records match query parameters.",
  NETWORK_ERROR = "Network Error",
  PARSE_ERROR = "Parse error",
  TIMOUT_ERROR = "Timeout Error",
  UNAUTHORIZED = `Unauthorized: please login first`,
  FORBIDDEN = `Forbidden: you don't have permission to do this operation`,
  NOT_FOUND_REQUEST = `Resource not found: the server couldn't find the requested resource. It may be doing something wrong.`,
  CONFLICT = `Conflict: the current state conflicts with the desired state`,
  INTERNAL_SERVER_ERROR = `Internal Server Error`,
  SOMETHING_WENT_WRONG = "Something went wrong",
  USERNAME_TAKEN = "Username already taken. Please try another one.",
  EMAIL_EXISTS = "This email is already in use. Please provide a different one.",
  WRONG_CREDENTIALS = "Incorrect username or password.",
  PROFILE_UPDATED = "Profile successfully updated!",
  PASSWORD_CHANGED = "  Password successfully changed!",
  LOGIN_REQUIRED = "    You must be logged in to perform this action.",
  ADMIN_RIGHTS_REQUIRED = "You don't have the rights to do that.",
  ONLY_OWNER_CAN_DELETE = "Only the owner of the item can delete it.",
  ITEM_NOT_FOUND = "Item not found.",
  COMMENT_NOT_FOUND = "Comment not found.",
  SUCCESSFULLY_CREATED = "Successfully created new item.",
  PARAMETER_MISSING = "Parameter missing from request.",
  CATEGORY_DOES_NOT_EXIST = "Category does not exist.",
  MAXIMUM_ITEMS_REACHED = "Maximum number of items reached for this category.",
  SERVER_ERROR = "Internal server error.",
  TOO_MANY_ATTEMPTS_TRY_LATER = "Too many failed attempts. Try again later.",
}

class Errors extends Error {
  public message: Message;
  public code: HttpCode;
  constructor(statusCode?: HttpCode, statusMessage?: Message) {
    super();
    this.code = statusCode || HttpCode.INTERNAL_SERVER_ERROR;
    this.message = statusMessage || Message.SOMETHING_WENT_WRONG;
  }
}

export default Errors;
