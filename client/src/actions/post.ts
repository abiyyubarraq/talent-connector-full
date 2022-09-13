import api from "../utils/api"
import { setAlert } from "./alert"
import { postActionTypes } from "./types"
import { Dispatch } from "redux"

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get posts
export const getPosts = () => async (dispatch: Dispatch<any>) => {
  try {
    const res = await api.get("/post/")

    dispatch({
      type: postActionTypes.GET_POSTS,
      payload: res.data,
    })
  } catch (err: any) {
    dispatch({
      type: postActionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Add like
export const addLike = (id: string) => async (dispatch: Dispatch<any>) => {
  try {
    const res = await api.put(`/post/like/${id}`)

    dispatch({
      type: postActionTypes.UPDATE_LIKES,
      payload: { id, likes: res.data },
    })
  } catch (err: any) {
    dispatch({
      type: postActionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Remove like

export const removeLike = (id: string) => async (dispatch: Dispatch<any>) => {
  try {
    const res = await api.put(`/post/unlike/${id}`)

    dispatch({
      type: postActionTypes.UPDATE_LIKES,
      payload: { id, likes: res.data },
    })
  } catch (err: any) {
    dispatch({
      type: postActionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Delete post
export const deletePost = (id: string) => async (dispatch: Dispatch<any>) => {
  try {
    await api.delete(`/post/${id}`)

    dispatch({
      type: postActionTypes.DELETE_POST,
      payload: id,
    })

    dispatch(setAlert("Post Removed", "success"))
  } catch (err: any) {
    dispatch({
      type: postActionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Add post
export const addPost = (formData: any) => async (dispatch: Dispatch<any>) => {
  try {
    const res = await api.post("/post/create", formData)

    dispatch({
      type: postActionTypes.ADD_POST,
      payload: res.data,
    })

    dispatch(setAlert("Post Created", "success"))
  } catch (err: any) {
    dispatch({
      type: postActionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Get post
export const getPost = (id: string) => async (dispatch: Dispatch<any>) => {
  try {
    const res = await api.get(`/post/${id}`)

    dispatch({
      type: postActionTypes.GET_POST,
      payload: res.data,
    })
  } catch (err: any) {
    dispatch({
      type: postActionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Add comment
export const addComment = (postId: string, formData: any) => async (dispatch: Dispatch<any>) => {
  try {
    const res = await api.put(`/post/${postId}/comment`, formData)

    dispatch({
      type: postActionTypes.ADD_COMMENT,
      payload: res.data,
    })

    dispatch(setAlert("Comment Added", "success"))
  } catch (err: any) {
    dispatch({
      type: postActionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Delete comment
export const deleteComment = (postId: string, commentId: string) => async (dispatch: Dispatch<any>) => {
  try {
    await api.delete(`/post/${postId}/comment/${commentId}`)

    dispatch({
      type: postActionTypes.REMOVE_COMMENT,
      payload: commentId,
    })

    dispatch(setAlert("Comment Removed", "success"))
  } catch (err: any) {
    dispatch({
      type: postActionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
