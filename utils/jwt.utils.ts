import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const privateKey = process.env.JWTSECRET as string

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, options)
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey)

    return { valid: true, expired: false, decoded }
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    }
  }
}
