/* eslint-disable */
import {RequestHandler, Response} from 'express';
import {MtRequest, StatusCode} from '../types';
import {TokenConfig} from './token-config';

// export const loginRequired: RequestHandler = async (
//   req: MtRequest<any>,
//   res: Response,
//   next: () => void
// ) => {
//   if (req.headers['x-limsplus-key']) {
//     const auth_token = req.headers['x-limsplus-key'];
//     const data = await TokenConfig.decode(auth_token as string);
//     req.userDetails = data;
//     next();
//   } else {
//     res
//       .status(StatusCode.UNAUTHORIZED)
//       .jsonp({ message: 'Unauthorized access' });
//     res.end();
//   }
// };

export const adminLoginRequired: RequestHandler = async (
  req: MtRequest<any>,
  res: Response,
  next: () => void
) => {
  try {
    if (req.headers['authorization']) {
      const auth_token = req.headers['authorization'].split('Bearer ')[1];
      if (auth_token.length > 4) {
        const data: any = await TokenConfig.verifyToken(auth_token as string);
        if (data) {
          req.userDetails = data;
          next();
        } else {
          res
            .status(StatusCode.UNAUTHORIZED)
            .jsonp({message: 'Unauthorized access'});
          res.end();
        }
      } else {
        res
          .status(StatusCode.UNAUTHORIZED)
          .jsonp({message: 'Unauthorized access'});
        res.end();
      }
    } else {
      res
        .status(StatusCode.UNAUTHORIZED)
        .jsonp({message: 'Unauthorized access'});
      res.end();
    }
  } catch (error) {
    res.status(StatusCode.UNAUTHORIZED).jsonp({message: 'Unauthorized access'});
    res.end();
  }
};
