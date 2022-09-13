import { authActionTypes, authState } from "../actions/types"

import { Reducer } from "redux"

const initialState: authState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
}

const authReducer: Reducer<authState> = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case authActionTypes.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      }
    case authActionTypes.REGISTER_SUCCESS:
    case authActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      }
    case authActionTypes.ACCOUNT_DELETED:
    case authActionTypes.AUTH_ERROR:
    case authActionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      }
    default:
      return state
  }
}

export default authReducer
