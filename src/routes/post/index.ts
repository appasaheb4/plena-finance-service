/* eslint-disable */
import {Router} from 'express';
import {responseHandler} from '../../response-handler';
import {PostController} from '../../controllers';
import {adminLoginRequired} from '../../middlewares';

class PostRoutes {
  public PostRouter: Router;
  constructor() {
    this.PostRouter = Router();
    this.initate();
  }

  private initate(): void {
    this.PostRouter.post('/create', responseHandler(PostController.create));
    this.PostRouter.get(
      '/list',
      adminLoginRequired,
      responseHandler(PostController.list)
    );
    this.PostRouter.delete(
      '/delete',
      adminLoginRequired,
      responseHandler(PostController.delete)
    );
    this.PostRouter.post(
      '/update',
      adminLoginRequired,
      responseHandler(PostController.update)
    );
    this.PostRouter.post(
      '/findByTitle',
      adminLoginRequired,
      responseHandler(PostController.findByTitle)
    );
  }
}
export default new PostRoutes().PostRouter;
