import dotenv from "dotenv"
import { get } from "lodash"
import { Request, Response } from "express"
import { validatePassword } from "../services/user.service"
import { createSession, createAccessToken, updateSession, findSessions } from "../services/session.service"
import { sign } from "../utils/jwt.utils"
import User, { IUserModel } from "../models/User"
import Logging from "../library/log"

dotenv.config()

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate the email and password
  const user: any = await validatePassword(req.body)

  if (!user) {
    return res.status(401).send("Invalid username or password")
  }

  // Create a session
  const session: any = await createSession(user._id, req.get("user-agent") || "")

  // create access token
  const accessToken = createAccessToken({
    user,
    session,
  })

  // create refresh token
  const refreshToken = sign(session, {
    expiresIn: "7 days", // 7 days
  })

  // send refresh & access token back
  return res.send({ accessToken, refreshToken })
}

export async function invalidateUserSessionHandler(req: Request, res: Response) {
  const sessionId = get(req, "user.session")

  await updateSession({ _id: sessionId }, { valid: false })

  return res.sendStatus(200)
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = get(req, "user._id")

  const sessions = await findSessions({ user: userId, valid: true })

  return res.send(sessions)
}

export async function getUserByToken(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id")
    const user = await User.findById(userId).select("-password")
    res.json(user)
  } catch (e: any) {
    Logging.error(e.message)
    res.status(500).send("Server Error")
  }
}
