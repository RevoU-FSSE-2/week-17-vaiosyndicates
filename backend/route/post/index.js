import express from "express";
import { createPosts, deletePosts, getPosts } from "../../controller/post/index.js";
import { checkToken } from "../../middleware/token/index.js";

const postRouter = express.Router();

postRouter.get('/', checkToken, getPosts)
postRouter.post('/', checkToken, createPosts)
postRouter.delete('/', checkToken, deletePosts)

export default postRouter