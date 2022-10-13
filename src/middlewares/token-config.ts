/* eslint-disable */
//import jwt from 'jwt-simple';
import jwt from 'jsonwebtoken';
import Config from '../config';

let refreshTokens = [];

class TokenConfig_ {
  public generateAccessToken = (user) => {
    return jwt.sign(user, Config.ACCESS_TOKEN_SECRET as string);
  };

  public verifyToken = (token): Promise<any> =>
    new Promise<any>((resolve, reject) => {
      jwt.verify(token, Config.ACCESS_TOKEN_SECRET as string, (err, user) => {
        //console.log({ err, user });
        if (err) reject;
        resolve(user);
      });
    });
}
export const TokenConfig = new TokenConfig_();
