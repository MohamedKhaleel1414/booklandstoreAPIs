const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getFieldValidator = [
  check('id').isMongoId().withMessage('Invalid Field id format'),
  validatorMiddleware,
];

exports.createFieldValidator = [
  check('name')
    .notEmpty()
    .withMessage('field required')
    
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.updateFieldValidator = [
  check('id').isMongoId().withMessage('Invalid field id format'),
  body('name')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteFieldValidator = [
  check('id').isMongoId().withMessage('Invalid field id format'),
  validatorMiddleware,
];
