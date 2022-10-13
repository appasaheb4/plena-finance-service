/* eslint-disable */
import {Schema} from 'mongoose';
import dayjs from 'dayjs';

import {findPost} from './post.statics';

const PostSchema = new Schema({
  userName: String,
  title: String,
  description: String,
  tags: String,
  image: Object,
  dateOfEntry: {
    type: Number,
    default: dayjs(new Date()).unix(),
  },
  lastUpdated: {
    type: Number,
    default: dayjs(new Date()).unix(),
  },
});

PostSchema.statics.findUser = findPost;

export default PostSchema;
