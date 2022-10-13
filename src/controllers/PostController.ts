/* eslint-disable */
import dayjs from 'dayjs';
import {MtResponse, MtRequest, StatusCode} from '../types';
import {connect, disconnect} from '../drivers/database';
import {TokenConfig} from '../middlewares';

class _PostController {
  public async create(request: MtRequest<any>): Promise<MtResponse<any>> {
    let body = request.body;
    try {
      const db = connect();
      body = {
        ...body,
        dateOfEntry: new Date(),
        lastUpdated: new Date(),
      };
      const posts = await db.PostModel.create(body);
      const accessToken = await TokenConfig.generateAccessToken({
        userName: body.userName,
      });
      return {
        statusCode: StatusCode.SUCCESS,
        body: {
          data: {
            data: {posts, accessToken},
            settings: {
              success: posts ? 1 : 0,
              message: posts ? 'Post created' : 'Post not created!',
            },
          },
          status: 'success',
        },
      };
    } catch (error: any) {
      return {
        statusCode: StatusCode.BAD_REQUEST,
        body: {
          status: 'error',
          message: error.message,
        },
      };
    } finally {
      disconnect();
    }
  }

  public async list(request: MtRequest<any>): Promise<MtResponse<any>> {
    try {
      const page = Number(request.params.page) * 10;
      const limit = Number(request.params.limit);
      const db = connect();
      let posts = await db.PostModel.find()
        .sort({_id: -1})
        .skip(page)
        .limit(limit);
      const count = await db.PostModel.count();
      return {
        statusCode: StatusCode.SUCCESS,
        body: {
          data: {
            data: {posts, count},
            settings: {
              success: posts ? 1 : 0,
              message: posts ? 'Posts available' : 'Posts not found!',
            },
          },
          status: 'success',
        },
      };
    } catch (error: any) {
      console.log({error});
      return {
        statusCode: StatusCode.BAD_REQUEST,
        body: {
          status: 'error',
          message: error.message,
        },
      };
    }
  }

  public async findByTitle(request: MtRequest<any>): Promise<MtResponse<any>> {
    try {
      const db = connect();
      let posts = await db.PostModel.find({title: request.body.title}).sort({
        _id: -1,
      });
      return {
        statusCode: StatusCode.SUCCESS,
        body: {
          data: {
            data: {posts},
            settings: {
              success: posts ? 1 : 0,
              message: posts ? 'Posts available' : 'Posts not found!',
            },
          },
          status: 'success',
        },
      };
    } catch (error: any) {
      console.log({error});
      return {
        statusCode: StatusCode.BAD_REQUEST,
        body: {
          status: 'error',
          message: error.message,
        },
      };
    }
  }

  public async delete(request: MtRequest<any>): Promise<MtResponse<any>> {
    try {
      const id = request.body.id as string;
      const db = connect();
      const posts = await db.PostModel.deleteMany({
        _id: id,
      });
      return {
        statusCode: StatusCode.SUCCESS,
        body: {
          data: posts,
          status: 'success',
        },
      };
    } catch (error: any) {
      return {
        statusCode: StatusCode.BAD_REQUEST,
        body: {
          status: 'error',
          message: error.message,
        },
      };
    } finally {
      disconnect();
    }
  }

  public async update(request: MtRequest<any>): Promise<MtResponse<any>> {
    try {
      const db = connect();
      const body = request.body;
      console.log({body});

      const update = await db.PostModel.updateMany({_id: body.id}, {...body});
      return {
        statusCode: StatusCode.SUCCESS,
        body: {
          data: update,
          status: 'success',
        },
      };
    } catch (error: any) {
      return {
        statusCode: StatusCode.BAD_REQUEST,
        body: {
          status: 'error',
          message: error.message,
        },
      };
    } finally {
      disconnect();
    }
  }
}

export const PostController = new _PostController();
