export enum alertActionType {
  SET_ALERT = "SET_ALERT",
  REMOVE_ALERT = "REMOVE_ALERT",
}

export interface authState {
  token: string | null
  isAuthenticated: boolean | null
  loading: boolean | null
  user: any
}

export enum authActionTypes {
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAIL = "REGISTER_FAIL",
  USER_LOADED = "USER_LOADED",
  AUTH_ERROR = "AUTH_ERROR",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
  LOGOUT = "LOGOUT",
  ACCOUNT_DELETED = "ACCOUNT_DELETED",
}

export enum profileActionTypes {
  GET_PROFILE = "GET_PROFILE",
  GET_PROFILES = "GET_PROFILES",
  GET_REPOS = "GET_REPOS",
  NO_REPOS = "NO_REPOS",
  UPDATE_PROFILE = "UPDATE_PROFILE",
  CLEAR_PROFILE = "CLEAR_PROFILE",
  PROFILE_ERROR = "PROFILE_ERROR",
}

export enum postActionTypes {
  GET_POSTS = "GET_POSTS",
  GET_POST = "GET_POST",
  POST_ERROR = "POST_ERROR",
  UPDATE_LIKES = "UPDATE_LIKES",
  DELETE_POST = "DELETE_POST",
  ADD_POST = "ADD_POST",
  ADD_COMMENT = "ADD_COMMENT",
  REMOVE_COMMENT = "REMOVE_COMMENT",
}
