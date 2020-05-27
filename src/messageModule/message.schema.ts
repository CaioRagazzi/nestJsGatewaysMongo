import * as mongoose from 'mongoose'

export const MessageSchema = new mongoose.Schema({
  name: String,
  message: String
});