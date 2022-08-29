import express from "express"
import requireUser from "../middleware/requireUser"
import { createProfileHandler, getAllProfilre, getMyProfile, getProfileById, updateProfileHandler, updateExperience, updateEducation, deleteExperience, deleteEducation } from "../controllers/Profiles"

const router = express.Router()

router.post("/create", requireUser, createProfileHandler)
router.get("/", getAllProfilre)
router.get("/me", requireUser, getMyProfile)
router.get("/user/:userId", getProfileById)
router.put("/me", requireUser, updateProfileHandler)
router.put("/experience", requireUser, updateExperience)
router.put("/education", requireUser, updateEducation)
router.delete("/experience/:exp_id", requireUser, deleteExperience)
router.delete("/education/:edu_id", requireUser, deleteEducation)
export = router
