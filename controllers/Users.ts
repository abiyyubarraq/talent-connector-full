import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import User from "../models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import gravatar from "gravatar"
import dotenv from "dotenv"
import log from "../library/log"
import { createUser } from "../services/user.service"
import { omit } from "lodash"

dotenv.config()

interface payload {
  user: {
    id: number
  }
}

export async function createUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await createUser(req.body)
    // res.send(omit(user.toJSON(), "password"))
    return next()
  } catch (e: any) {
    log.error(e)
    return res.status(409).send(e.message)
  }
}

/*export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ errors: [{ message: "invalid credentials" }] })
    }
    const passMatch = await bcrypt.compare(password, user.password)

    if (!passMatch) {
      return res.status(400).json({ errors: [{ message: "invalid username or password" }] })
    }
    const payload: payload = {
      user: {
        id: user.id,
      },
    }
    jwt.sign(payload, String(process.env.JWTSECRET), { expiresIn: "5 days" }, (err, token) => {
      if (err) throw err
      res.json({ token })
    })
  } catch (err: any) {
    console.error(err.message)
    res.status(500).send("server error")
  }
}

export const getUserbyToken = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
  } catch (err: any) {
    console.error(err.message)
    res.status(500).send("server error")
  }
}

const createUserggg = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body
  try {
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] })
    }

    const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" })
    user = new User({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      avatar,
      password,
    })
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()
    const payload: payload = {
      user: {
        id: user.id,
      },
    }
    jwt.sign(payload, String(process.env.JWTSECRET), { expiresIn: "5 days" }, (err, token) => {
      if (err) throw err
      res.json({ token })
    })
  } catch (err: any) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
}*/
