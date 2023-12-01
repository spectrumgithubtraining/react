const {check,validationResult} = require('express-validator')


const productValidationRules = () => {
    return [
      check('id')
        .notEmpty()
        .withMessage('ID cannot be empty')
        .isString()
        .trim(),
       
  
      check('productName')
        .notEmpty()
        .withMessage('Product name cannot be empty')
        .isString()
        .withMessage('Product name must be a string')
        .trim(),
  
      check('categoryId')
        .notEmpty()
        .withMessage('Category ID cannot be empty')
        .isString()
        .withMessage('Category ID must be a string')
        .trim(),
  
      check('description')
        .notEmpty()
        .withMessage('Description cannot be empty')
        .isString()
        .withMessage('Description must be a string')
        .trim(),
  
      check('price')
        .notEmpty()
        .withMessage('Price cannot be empty')
        .isNumeric()
        .withMessage('Price must be a number'),
  
      check('isAvailable')
        .notEmpty()
        .withMessage('Availability cannot be empty')
        .isBoolean()
        .withMessage('Availability must be a boolean'),
  
      check('productImage')
        .notEmpty()
        .withMessage('Product image URL cannot be empty')
        .isString()
        .withMessage('Invalid URL for product image')
        .trim(),
  
      check('rating')
        .notEmpty()
        .withMessage('Rating cannot be empty')
        .isNumeric()
        .withMessage('Rating must be a number'),
  
      check('review')
        .notEmpty()
        .withMessage('Review cannot be empty')
        .isNumeric()
        .withMessage('Review must be a number'),
  
      check('vendorName')
        .notEmpty()
        .withMessage('Vendor name cannot be empty')
        .isString()
        .withMessage('Vendor name must be a string')
        .trim(),
  
      check('warranty')
        .notEmpty()
        .withMessage('Warranty cannot be empty')
        .isString()
        .withMessage('Warranty must be a string')
        .trim(),
    ];
  };
  const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
  
      return next();
    }
  
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  
    return res.status(422).json({
      errors: extractedErrors,
    });
  };
  
  module.exports = {
    productValidationRules,
    validate,
  };