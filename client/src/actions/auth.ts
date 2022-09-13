import api from "../utils/api"
import { authActionTypes } from "./types"
import { Dispatch } from "redux"
import { setAlert } from "./alert"

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Load User
export const loadUser = () => async (dispatch: Dispatch<any>) => {
  try {
    const res = await api.get("user/login")

    dispatch({
      type: authActionTypes.USER_LOADED,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: authActionTypes.AUTH_ERROR,
    })
  }
}

// Register User
export const register = (formData: any) => async (dispatch: Dispatch<any>) => {
  try {
    const res = await api.post("user/register", formData)

    dispatch({
      type: authActionTypes.REGISTER_SUCCESS,
      payload: res.data,
    })

    await dispatch(loadUser())
  } catch (err: any) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")))
    }

    dispatch({
      type: authActionTypes.REGISTER_FAIL,
    })
  }
}

// Login User
export const login = (email: string, password: string) => async (dispatch: Dispatch<any>) => {
  const body = { email, password }

  try {
    const res = await api.post("/user/login", body)

    dispatch({
      type: authActionTypes.LOGIN_SUCCESS,
      payload: res.data,
    })

    await dispatch(loadUser())
  } catch (err: any) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")))
    }

    dispatch({
      type: authActionTypes.LOGIN_FAIL,
    })
  }
}

// Logout
export const logout = () => ({ type: authActionTypes.LOGOUT })
