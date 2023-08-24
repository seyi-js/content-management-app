import { NextFunction, Request, Response } from 'express';
import { errorResponse } from '../utils';
import { UtilService } from '../modules/util/service';

const utilService = new UtilService();

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return errorResponse(res, 401, 'Unauthorized');
    }

    const decoded = await utilService.validateToken(token);

    if (!decoded) {
      return errorResponse(res, 401, 'Unauthorized');
    }

    req.body.user = decoded;

    next();
  } catch (error: any) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};
