import {Request, Response, NextFunction} from 'express';
import {ERROR_TYPES} from '../shared/constants';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case ERROR_TYPES.VALIDATION_ERROR:
      res.status(statusCode).json({title: 'Validation Failed', message: err.message});
      break;
    case ERROR_TYPES.NOT_FOUND:
      res.status(statusCode).json({title: 'Not Found', message: err.message});
      break;
    case ERROR_TYPES.UNAUTHORIZED:
      res.status(statusCode).json({title: 'Unauthorized', message: err.message});
      break;
    case ERROR_TYPES.FORBIDDEN:
      res.status(statusCode).json({title: 'Forbidden', message: err.message});
      break;
    case ERROR_TYPES.SERVER_ERROR:
      res.status(statusCode).json({title: 'Server Error', message: err.message});
      break;
    default:
      break;
  }
};
