import express from "express";
import { approvePost, getAllUser } from "../../controller/admin/index.js";
import { checkTokenAdmin } from "../../middleware/token/index.js";

const adminRouter = express.Router();



adminRouter.get('/', checkTokenAdmin, getAllUser)
adminRouter.put('/', checkTokenAdmin, approvePost)

export default adminRouter