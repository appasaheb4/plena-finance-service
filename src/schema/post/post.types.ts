/* eslint-disable */
import {Document, Model} from 'mongoose';
export interface Post {
  userName: string;
  title: string;
  description: string;
  tags: string;
  image: any;
}

export interface PostDocument extends Post, Document {}

export interface PostModel extends Model<PostDocument> {
  find: any;
  updateMany: any;
  findPost: (
    this: PostModel,
    {title}: {title: string}
  ) => Promise<PostDocument>;
  list: (this: PostModel) => Promise<PostDocument>;
}
