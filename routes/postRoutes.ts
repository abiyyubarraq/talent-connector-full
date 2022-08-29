import express from "express"
import { createPostHandler, findAllPost, findPostById, dellPostById, likeAPost, dellLike, createComment, dellComment } from "../controllers/Posts"
import requireUser from "../middleware/requireUser"

const router = express.Router()

router.post("/create", requireUser, createPostHandler)
router.get("/", requireUser, findAllPost)
router.get("/:post_id", requireUser, findPostById)
router.delete("/:post_id", requireUser, dellPostById)
router.put("/like/:post_id", requireUser, likeAPost)
router.put("/unlike/:post_id", requireUser, dellLike)
router.put("/:post_id/comment", requireUser, createComment)
router.delete("/:post_id/comment/:comment_id", requireUser, dellComment)

export = router
