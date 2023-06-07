const { body, validationResult } = require('express-validator');

module.exports.userValidationRules = () => [
  body('email', 'Your email is empty').not().isEmpty(),
  body('email', 'Your email is not valid').isEmail().normalizeEmail(),
  body('password', 'Your password is empty').not().isEmpty(),
  body('password', 'Your password must be at least 4 characters').isLength({
    min: 4,
  }),
];

module.exports.movieValidationRules = () => [
  body('title', 'The title is empty').not().isEmpty(),
  body('description', 'the description is empty').not().isEmpty(),
  body('image', 'the image is empty').not().isEmpty(),
];

module.exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({ errors: errors.array() });
};
