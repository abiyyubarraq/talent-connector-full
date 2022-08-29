import express from "express"
import { createUserHandler } from "../controllers/Users"
import { get } from "lodash"
import { Request, Response } from "express"
import auth from "../middleware/auth"
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler, getUserByToken } from "../controllers/Sessions"
import validateRequest from "../middleware/validateRequest"
import requireUser from "../middleware/requireUser"
import { createUserSchema, createUserSessionSchema } from "../Schema/userSchema"

const router = express.Router()
router.post("/register", validateRequest(createUserSchema), createUserHandler)
router.post("/login", validateRequest(createUserSessionSchema), createUserSessionHandler)
router.get("/token/login", requireUser, getUserSessionsHandler)
router.get("/login", requireUser, getUserByToken)
router.delete("/logout", requireUser, invalidateUserSessionHandler)
export = router
