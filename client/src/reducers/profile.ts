import { Reducer } from "redux"
import { profileActionTypes } from "../actions/types"

interface IinitialState {
  profile: any
  profiles: any
  repos: any
  loading: boolean
  error: any
}

const initialState: IinitialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
}

const profileReducer: Reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case profileActionTypes.GET_PROFILE:
    case profileActionTypes.UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      }
    case profileActionTypes.GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      }
    case profileActionTypes.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      }
    case profileActionTypes.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
      }
    case profileActionTypes.GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      }
    case profileActionTypes.NO_REPOS:
      return {
        ...state,
        repos: [],
      }
    default:
      return state
  }
}

export default profileReducer
