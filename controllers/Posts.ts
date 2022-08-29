import Logging from "../library/log"
import { get } from "lodash"
import { NextFunction, Request, Response } from "express"
import Post, { IPostModel } from "../models/Post"
import { createPost, getAllPost, getPostbyId, deleteById, findAndUpdate, findSpesific } from "../services/post.service"
import { findUserById } from "../services/user.service"

export async function createPostHandler(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id")
    const user: any = await findUserById(userId)
    const body = req.body

    const post = await createPost({ ...body, user: userId, name: user.name, avatar: user.avatar })

    return res.send(post)
  } catch (e: any) {
    Logging.error(e)
    return res.status(500).send(e.message)
  }
}

export async function findAllPost(req: Request, res: Response) {
  try {
    const post = await getAllPost()

    return res.send(post)
  } catch (e: any) {
    Logging.error(e)
    return res.status(500).send(e.message)
  }
}

export async function findPostById(req: Request, res: Response) {
  try {
    const postId = get(req, "params.post_id")
    const post = await getPostbyId(postId)

    return res.send(post)
  } catch (e: any) {
    Logging.error(e)
    return res.status(500).send(e.message)
  }
}

export async function dellPostById(req: Request, res: Response) {
  try {
    const postId = get(req, "params.post_id")
    const post = await deleteById({ _id: postId })

    return res.send(post)
  } catch (e: any) {
    Logging.error(e)
    return res.status(500).send(e.message)
  }
}

export async function likeAPost(req: Request, res: Response) {
  try {
    const postId = get(req, "params.post_id")
    const userId = get(req, "user._id")
    const post = await getPostbyId(postId)
    if (!post) return res.status(400).json({ msg: "post not found" })
    if (post.likes.some((like) => like.user.toString() === userId)) {
      return res.status(400).json({ msg: "Post already liked" })
    }
    // const postliked = await findSpesific({ _id: postId, likes: { $elemMatch: { user: userId } } })
    // if (postliked) return res.status(400).json({ msg: "Post already liked" })
    const likedPost = await findAndUpdate({ postId }, { $push: { likes: { user: userId } } }, { new: true })
    return res.json(likedPost)
  } catch (e: any) {
    Logging.error(e)
    return res.status(500).send(e.message)
  }
}

export async function dellLike(req: Request, res: Response) {
  try {
    const postId = get(req, "params.post_id")
    const userId = get(req, "user._id")
    const post = await getPostbyId(postId)
    if (!post) return res.status(400).json({ msg: "post not found" })
    if (!post.likes.some((like) => like.user.toString() === userId)) {
      return res.status(400).json({ msg: "Post has not yet been liked" })
    }
    // const postliked = await findSpesific({ _id: postId, likes: { $elemMatch: { user: userId } } })
    // if (postliked) return res.status(400).json({ msg: "Post already liked" })
    const likedPost = await findAndUpdate({ postId }, { $pull: { likes: { user: userId } } }, { new: true })
    return res.json(likedPost)
  } catch (e: any) {
    Logging.error(e)
    return res.status(500).send(e.message)
  }
}

export async function createComment(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id")
    const postId = get(req, "params.post_id")
    const user: any = await findUserById(userId)
    const body = req.body
    const commentedPost = await findAndUpdate({ postId }, { $push: { comments: { ...body, user: userId, name: user.name, avatar: user.avatar } } }, { new: true })
    return res.json(commentedPost)
  } catch (e: any) {
    Logging.error(e)
    return res.status(500).send(e.message)
  }
}

export async function dellComment(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id")
    const postId = get(req, "params.post_id")
    const commentId = get(req, "params.comment_id")
    const user: any = await findUserById(userId)
    const body = req.body
    const commentedPost = await findAndUpdate({ postId }, { $pull: { comments: { _id: commentId } } }, { new: true })
    return res.json(commentedPost)
  } catch (e: any) {
    Logging.error(e)
    return res.status(500).send(e.message)
  }
}
