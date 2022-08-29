import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { Request, Response, NextFunction } from "express"
import { decode } from "../utils/jwt.utils"
dotenv.config()

const auth = (req: Request, res: Response, next: NextFunction) => {
  //Get token from header
  const token: any = req.header("x-auth-token")
  //checking if token exist
  const { decoded, expired } = decode(token)

  if (!token) {
    return res.status(401).json({ msg: "no token, auth denied " })
  }
  try {
    jwt.verify(token, String(process.env.JWTSECRET), (error: any, decoded: any) => {
      if (error) {
        return res.status(401).json({ msg: "Token is not valid" })
      } else {
        req.user = decoded.user
        next()
      }
    })
  } catch (err: any) {
    console.error("something wrong with auth process")
    res.status(500).json({ msg: "server error" })
  }
}
export default auth
