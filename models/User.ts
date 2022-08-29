import mongoose, { Document, Schema } from "mongoose"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"

dotenv.config()

export interface IUserModel extends Document {
  name: string
  email: string
  password: string
  avatar: string
  date: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

UserSchema.pre("save", async function (next) {
  let user = this as IUserModel

  if (!user.isModified("password")) return next(null)
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hashSync(user.password, salt)
  user.password = hash

  return next(null)
})

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  let user = this as IUserModel

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false)
}

export default mongoose.model<IUserModel>("User", UserSchema)
