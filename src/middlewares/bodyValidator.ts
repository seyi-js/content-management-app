import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { errorResponse } from '../utils/responseHandler';
import { IValidationType } from './interface';

export const validateBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();
  const extractedErrors = [];
  errors.array().forEach((err: any) => {
    extractedErrors.push(`${err.param} invalid`);
  });
  const err = errors.array()[0];
  const errMessage = `${err.msg}: '${err.param}' in ${err.location}`;
  return errorResponse(res, 400, 'some error occurred', [], errMessage);
};

export const validationRules = (action: IValidationType) => {
  switch (action) {
    case 'create-user':
      return [
        body('firstName')
          .exists()
          .withMessage('firstName is required')
          .isString()
          .withMessage('firstName must be a string'),
        body('lastName')
          .exists()
          .withMessage('lastName is required')
          .isString()
          .withMessage('lastName must be a string'),
      ];

    case 'create-post':
      return [
        body('title').exists().withMessage('title is required'),
        body('content').exists().withMessage('body is required'),
      ];

    case 'create-comment':
      return [body('content').exists().withMessage('content is required')];

    default:
      return [];
  }
};
