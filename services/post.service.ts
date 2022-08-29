import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose"
import { omit } from "lodash"
import Post, { IPostModel } from "../models/Post"

export function createPost(input: DocumentDefinition<IPostModel>) {
  return Post.create(input)
}

export function getAllPost() {
  return Post.find().sort({ createdAt: -1 })
}

export function getPostbyId(query: FilterQuery<IPostModel>, options: QueryOptions = { lean: true }) {
  return Post.findById(query, {}, options)
}

export function deleteById(query: FilterQuery<IPostModel>) {
  return Post.deleteOne(query, {})
}

export function findAndUpdate(query: FilterQuery<IPostModel>, update: UpdateQuery<IPostModel>, options: QueryOptions) {
  return Post.findOneAndUpdate(query, update, options)
}

export function findSpesific(query: FilterQuery<IPostModel>, options: QueryOptions = { lean: true }) {
  return Post.find(query, options)
}
