/* eslint-disable */
import {PostDocument, Post, PostModel} from './post.types';

export async function findPost(
  this: PostModel,
  {title}: {title: string}
): Promise<Post | any> {
  try {
    const record = await this.find({
      title: title,
    });
    if (record) {
      return record[0];
    } else {
      return;
    }
  } catch (error) {
    Promise.reject(error);
  }
}
