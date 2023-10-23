import express from "express";
import { testFetch, registerUser, loginUser, reqRefreshToken, resetPasswords } from "../../controller/auth/index.js";
import { validate } from "../../middleware/input/index.js";


const apirouter = express.Router();

apirouter.get('/auth', testFetch)
apirouter.post('/auth/register', registerUser)
apirouter.post('/auth/login', loginUser)
apirouter.post('/auth/reset', validate.validatePassword, resetPasswords)
apirouter.post('/auth/refresh', reqRefreshToken)
 
export default apirouter