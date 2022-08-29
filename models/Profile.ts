import mongoose, { Document, Schema } from "mongoose"
import { IUserModel } from "./User"

export interface IProfileModel extends Document {
  user: IUserModel["_id"]
  status: string
  skills: string[]
  website: string
  bio: string
  education: {
    school: string
    degree: string
    from: Date
    to: Date
    fieldofstudy: string
    description: string
  }[]
  experience: {
    title: string
    company: string
    from: Date
    to: Date
    description: string
  }[]
  social: {
    linkedin: string
    instagram: string
  }[]
  createdAt: Date
  updatedAt: Date
}
const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    website: {
      type: String,
    },
    bio: {
      type: String,
    },
    education: [
      {
        school: {
          type: String,
          required: true,
        },
        degree: {
          type: String,
          required: true,
        },
        fieldofstudy: {
          type: String,
          required: true,
        },
        from: {
          type: Date,
        },
        to: {
          type: Date,
        },
        description: {
          type: String,
        },
      },
    ],
    experience: [
      {
        title: {
          type: String,
          required: true,
        },
        company: {
          type: String,
          required: true,
        },
        from: {
          type: Date,
        },
        to: {
          type: Date,
        },
        description: {
          type: String,
        },
      },
    ],
    social: {
      linkedin: {
        type: String,
      },
      instagram: {
        type: String,
      },
    },
  },
  { timestamps: true }
)

const Profile = mongoose.model<IProfileModel>("Profile", ProfileSchema)
export default Profile
