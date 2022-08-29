import mongoose, { Document, Schema } from "mongoose"
import { IUserModel } from "./User"

export interface IPostModel extends Document {
  user: IUserModel["_id"]
  text: string
  name: string
  avatar: string
  likes: IUserModel["_id"][]
  comment: {
    user: IUserModel["_id"]
    text: string
    name: string
    avatar: string
    date: Date
  }[]
  createdAt: Date
  updatedAt: Date
}

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
        },
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
        },
        text: {
          type: String,
          required: true,
        },
        name: {
          type: String,
        },
        avatar: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
)
const Post = mongoose.model<IPostModel>("Post", PostSchema)
export default Post
