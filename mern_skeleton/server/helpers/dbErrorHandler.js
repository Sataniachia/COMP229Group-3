/**
 * Database error handler helper functions
 */

/**
 * Format mongoose validation errors
 */
const getUniqueErrorMessage = (err) => {
  let output;
  try {
    let fieldName = err.errmsg.substring(
      err.errmsg.lastIndexOf('.$') + 2,
      err.errmsg.lastIndexOf('_1')
    );
    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';
  } catch (ex) {
    output = 'Unique field already exists';
  }
  return output;
};

/**
 * Get the error message from error object
 */
const getErrorMessage = (err) => {
  let message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;
      case 16:
        message = 'Server not available';
        break;
      default:
        message = 'Something went wrong';
    }
  } else if (err.errors) {
    // Handle validation errors
    for (let errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
        break;
      }
    }
  } else if (err.message) {
    message = err.message;
  } else {
    message = 'Unknown error occurred';
  }

  return message;
};

/**
 * Format validation errors for API response
 */
const formatValidationErrors = (err) => {
  const errors = [];
  
  if (err.errors) {
    for (let field in err.errors) {
      errors.push({
        field: field,
        message: err.errors[field].message
      });
    }
  }
  
  return errors;
};

export { getErrorMessage, getUniqueErrorMessage, formatValidationErrors };
