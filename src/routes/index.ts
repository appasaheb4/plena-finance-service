/* eslint-disable */
import { Router } from 'express';
import PostRouter from './post';

class Api {
  public apiRouter = Router();
  constructor() {
    this.initate();
  }
  private initate(): void {
    this.apiRouter.use('/post', PostRouter);
   
  }
}

export default new Api().apiRouter;
