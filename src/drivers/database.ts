/* eslint-disable */
import mongoose from 'mongoose';
import Config from '../config';

import { PostModel } from '../schema/post/post.model';

export const connect = () => {
  let db: any = mongoose
    .connect(Config.MONGODB_URL as string, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((dbConnection) => {
      db = dbConnection;
    })
    .catch((error) => {
      console.log({ error });
    });

  mongoose.connection;
  mongoose.connection.once('open', async () => {
    console.log('Connected to database');
  });
  mongoose.connection.on('error', () => {
    console.log('Error connecting to database');
  });

  return {
    PostModel,
  };
};

export const disconnect = async () => {
  mongoose.disconnect();
};
