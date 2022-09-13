import { NavigateFunction } from "react-router-dom"
import { Dispatch } from "redux"
import api from "../utils/api"
import { setAlert } from "./alert"

import { profileActionTypes } from "./types"

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get current users profile
export const getCurrentProfile = () => async (dispatch: Dispatch<any>) => {
  try {
    const res = await api.get("/profile/me")

    dispatch({
      type: profileActionTypes.GET_PROFILE,
      payload: res.data,
    })
  } catch (err: any) {
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Get all profiles
export const getProfiles = () => async (dispatch: Dispatch<any>) => {
  dispatch({ type: profileActionTypes.CLEAR_PROFILE })

  try {
    const res = await api.get("/profile/")

    dispatch({
      type: profileActionTypes.GET_PROFILES,
      payload: res.data,
    })
  } catch (err: any) {
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Get profile by ID
export const getProfileById = (userId: string) => async (dispatch: Dispatch<any>) => {
  try {
    const res = await api.get(`/profile/user/${userId}`)

    dispatch({
      type: profileActionTypes.GET_PROFILE,
      payload: res.data,
    })
  } catch (err: any) {
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Get Github repos
export const getGithubRepos = (username: string) => async (dispatch: Dispatch<any>) => {
  try {
    const res = await api.get(`/profile/github/${username}`)

    dispatch({
      type: profileActionTypes.GET_REPOS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: profileActionTypes.NO_REPOS,
    })
  }
}

// Create or update profile
export const createProfile =
  (formData: any, navigate: NavigateFunction, edit = false) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const res = await api.post("/profile/create", formData)

      dispatch({
        type: profileActionTypes.GET_PROFILE,
        payload: res.data,
      })

      dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"))

      if (!edit) {
        navigate("/dashboard")
      }
    } catch (err: any) {
      const errors = err.response.data.errors

      if (errors) {
        errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")))
      }

      dispatch({
        type: profileActionTypes.PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }

//Update Profile
export const updateProfile =
  (formData: any, navigate: NavigateFunction, edit = false) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const res = await api.put("/profile/me", formData)

      dispatch({
        type: profileActionTypes.GET_PROFILE,
        payload: res.data,
      })

      dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"))

      if (!edit) {
        navigate("/dashboard")
      }
    } catch (err: any) {
      const errors = err.response.data.errors

      if (errors) {
        errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")))
      }

      dispatch({
        type: profileActionTypes.PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }

// Add Experience
export const addExperience = (formData: any, navigate: NavigateFunction) => async (dispatch: Dispatch<any>) => {
  try {
    const res = await api.put("/profile/experience", formData)

    dispatch({
      type: profileActionTypes.UPDATE_PROFILE,
      payload: res.data,
    })

    dispatch(setAlert("Experience Added", "success"))

    navigate("/dashboard")
  } catch (err: any) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")))
    }

    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Add Education
export const addEducation = (formData: any, navigate: NavigateFunction) => async (dispatch: Dispatch<any>) => {
  try {
    const res = await api.put("/profile/education", formData)

    dispatch({
      type: profileActionTypes.UPDATE_PROFILE,
      payload: res.data,
    })

    dispatch(setAlert("Education Added", "success"))

    navigate("/dashboard")
  } catch (err: any) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")))
    }

    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Delete experience
export const deleteExperience = (id: string) => async (dispatch: Dispatch<any>) => {
  try {
    const res = await api.delete(`/profile/experience/${id}`)

    dispatch({
      type: profileActionTypes.UPDATE_PROFILE,
      payload: res.data,
    })

    dispatch(setAlert("Experience Removed", "success"))
  } catch (err: any) {
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Delete education
export const deleteEducation = (id: string) => async (dispatch: Dispatch<any>) => {
  try {
    const res = await api.delete(`/profile/education/${id}`)

    dispatch({
      type: profileActionTypes.UPDATE_PROFILE,
      payload: res.data,
    })

    dispatch(setAlert("Education Removed", "success"))
  } catch (err: any) {
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Delete account & profile
// export const deleteAccount = () => async (dispatch: Dispatch<any>) => {
//   if (window.confirm("Are you sure? This can NOT be undone!")) {
//     try {
//       await api.delete("/profile")

//       dispatch({ type: profileActionTypes.CLEAR_PROFILE })
//       dispatch({ type: profileActionTypes.ACCOUNT_DELETED })

//       dispatch(setAlert("Your account has been permanently deleted"))
//     } catch (err: any) {
//       dispatch({
//         type: profileActionTypes.PROFILE_ERROR,
//         payload: { msg: err.response.statusText, status: err.response.status },
//       })
//     }
//   }
// }
