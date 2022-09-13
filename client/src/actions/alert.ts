import { Dispatch } from "redux"
import { v4 as uuidv4 } from "uuid"
import { alertActionType } from "./types"

export const setAlert =
  (msg: any, alertType: any, timeout = 5000) =>
  (dispatch: Dispatch) => {
    const id = uuidv4()
    dispatch({
      type: alertActionType.SET_ALERT,
      payload: { msg, alertType, id },
    })

    setTimeout(() => dispatch({ type: alertActionType.REMOVE_ALERT, payload: id }), timeout)
  }
