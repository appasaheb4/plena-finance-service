/* eslint-disable */
import dotenv from 'dotenv';
const result = dotenv.config();
if (result.error) {
  throw result.error;
}

class Config {
  public PORT = '8080';
  public MONGODB_URL = process.env.MONGODB_URL;
  public ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
}

export default new Config();
