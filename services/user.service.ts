import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose"
import { omit } from "lodash"
import User, { IUserModel } from "../models/User"
import gravatar from "gravatar"
import mongoose from "mongoose"

export async function createUser(input: DocumentDefinition<IUserModel>) {
  try {
    input.avatar = gravatar.url(input.email, { s: "200", r: "pg", d: "mm" })

    return await User.create(input)
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function findUser(query: FilterQuery<IUserModel>) {
  return User.findOne(query).lean()
}

export async function validatePassword({ email, password }: { email: IUserModel["email"]; password: string }) {
  const user: any = await User.findOne({ email })

  if (!user) {
    return false
  }

  const isValid = await user.comparePassword(password)

  if (!isValid) {
    return false
  }

  return omit(user.toJSON(), "password")
}

export function findUserById(query: FilterQuery<IUserModel>, options: QueryOptions = { lean: true }) {
  return User.findById(query, {}, options).select("-password")
}
