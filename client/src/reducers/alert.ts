import { Reducer } from "redux"
import { alertActionType } from "../actions/types"

const initialState: any = []

const alertReducer: Reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case alertActionType.SET_ALERT:
      return [...state, payload]
    case alertActionType.REMOVE_ALERT:
      return state.filter((alert: any) => alert.id !== payload)
    default:
      return state
  }
}

export default alertReducer
