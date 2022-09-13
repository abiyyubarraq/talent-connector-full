import { NextFunction, Request, Response } from "express"
import { omit } from "lodash"
import { createProfile, findProfile, findAndUpdate } from "../services/profile.service"
import Logging from "../library/log"
import { get } from "lodash"
import Profile, { IProfileModel } from "../models/Profile"

export async function createProfileHandler(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id")
    const body = req.body
    const profile = await createProfile({ ...body, user: userId })

    return res.send(profile)
  } catch (e: any) {
    Logging.error(e)
    return res.status(409).send(e.message)
  }
}

export async function getMyProfile(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id")
    const profile = await findProfile({ user: userId })

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" })
    }

    res.json(profile)
  } catch (e: any) {
    Logging.error(e)
    return res.status(409).send(e.message)
  }
}

export async function getAllProfilre(req: Request, res: Response) {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"])
    res.json(profiles)
  } catch (e: any) {
    Logging.error(e)
    return res.status(409).send(e.message)
  }
}

export async function getProfileById(req: Request, res: Response) {
  try {
    const userId = get(req, "params.userId")

    const profile = await findProfile({ user: userId })

    if (!profile) return res.status(400).json({ msg: "Profile not found" })

    return res.json(profile)
  } catch (e: any) {
    Logging.error(e)
    return res.status(409).send(e.message)
  }
}

export async function updateProfileHandler(req: Request, res: Response) {
  const userId = get(req, "user._id")
  const profileId = get(req, "params.profileId")
  const { status, skills, website, bio, linkedin, instagram } = req.body
  const profileField = {
    status: status,
    website: website,
    bio: bio,
    skills: Array.isArray(skills) ? skills : skills.split(",").map((skill: any) => " " + skill.trim()),
    social: { linkedin: linkedin, instagram: instagram },
  }

  const profile: any = await findProfile({ user: userId })

  if (!profile) return res.status(400).json({ msg: "Profile not found" })
  // if (String(profile.user._id) !== userId) {
  //   return res.sendStatus(401)
  // }

  const updatedProfile = await findAndUpdate({ user: userId }, profileField, { new: true })
  return res.send(updatedProfile)
}

export async function updateExperience(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id")

    const profile: any = await findProfile({ user: userId })

    if (!profile) return res.status(400).json({ msg: "Profile not found" })

    const updatedProfile = await findAndUpdate({ user: userId }, { $push: { experience: req.body } }, { new: true })

    return res.json(updatedProfile)
  } catch (e: any) {
    Logging.error(e)
    return res.status(500).send("server error")
  }
}

export async function updateEducation(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id")
    const profile: any = await findProfile({ user: userId })

    if (!profile) return res.status(400).json({ msg: "Profile not found" })
    const updatedProfile = await findAndUpdate({ user: userId }, { $push: { education: req.body } }, { new: true })
    return res.json(updatedProfile)
  } catch (e: any) {
    Logging.error(e)
    return res.status(500).send("server error")
  }
}

export async function deleteExperience(req: Request, res: Response) {
  try {
    const expId = get(req, "params.exp_id")
    const userId = get(req, "user._id")
    const profile: any = await findProfile({ user: userId })

    if (!profile) return res.status(400).json({ msg: "Profile not found" })
    const updatedProfile = await findAndUpdate({ user: userId }, { $pull: { experience: { _id: expId } } }, { new: true })
    return res.json(updatedProfile)
  } catch (e: any) {
    Logging.error(e)
    return res.status(500).send("server error")
  }
}

export async function deleteEducation(req: Request, res: Response) {
  try {
    const eduId = get(req, "params.edu_id")
    const userId = get(req, "user._id")
    const profile: any = await findProfile({ user: userId })

    if (!profile) return res.status(400).json({ msg: "Profile not found" })
    const updatedProfile = await findAndUpdate({ user: userId }, { $pull: { education: { _id: eduId } } }, { new: true })
    return res.json(updatedProfile)
  } catch (e: any) {
    Logging.error(e)
    return res.status(500).send("server error")
  }
}
