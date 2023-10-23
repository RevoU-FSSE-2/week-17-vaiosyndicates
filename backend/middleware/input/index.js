import { check, validationResult } from 'express-validator'

export const validate = {
  validatePassword: [
    check('email')
    .not()
    .isEmpty()
    .withMessage('Email can not be empty!')
    .bail(),
    check('oldPassword')
    .not()
    .isEmpty()
    .withMessage('Old password can not be empty!')
    .bail(),
    check('newPassword')
    .not()
    .isEmpty()
    .withMessage('New password can not be empty!')
    .bail()
    .isLength({min: 8})
    .withMessage('New password minimum 8 characters required!')
    .bail()
    .isAlphanumeric()
    .withMessage('New password only accept Alphanumeric')
    .bail(),
    check('confirmationPassword')
    .not()
    .isEmpty()
    .withMessage('Confirmation password can not be empty!')
    .custom((value, {req}) => {
      if (value !== req.body.newPassword) {
          throw new Error('Confirmation password not match');
      }
        return true;
      }),
    ( req, res, next ) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({
                  responseCode: 422,
                  message: errors.msg,
                  errors: errors.array()
               });
      next();
   }
  ]
}