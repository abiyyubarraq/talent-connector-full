import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose"
import { omit } from "lodash"
import Profile, { IProfileModel } from "../models/Profile"

export async function createProfile(input: DocumentDefinition<IProfileModel>) {
  try {
    return await Profile.create(input)
  } catch (error: any) {
    throw new Error(error)
  }
}

export function findProfile(query: FilterQuery<IProfileModel>, options: QueryOptions = { lean: true }) {
  return Profile.findOne(query, {}, options).populate("user", ["name", "avatar"])
}

// export async function findProfileClean(input: DocumentDefinition<IProfileModel>, query: FilterQuery<IProfileModel>, options: QueryOptions = { lean: true }) {
// return Profile.insert(input)
// }

export function findAndUpdate(query: FilterQuery<IProfileModel>, update: UpdateQuery<IProfileModel>, options: QueryOptions) {
  return Profile.findOneAndUpdate(query, update, options)
}
