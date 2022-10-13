/* eslint-disable */
import {model} from 'mongoose';
import {PostDocument, PostModel as IPostModel} from './post.types';
import PostSchema from './post.schema';
export const PostModel: any = model<PostDocument>(
  'posts',
  PostSchema
) as IPostModel;
