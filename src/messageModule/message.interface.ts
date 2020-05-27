import * as mongoose from 'mongoose';

export interface Message extends mongoose.Document {
  name: string,
  message: string
}