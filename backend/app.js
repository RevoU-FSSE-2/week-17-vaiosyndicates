import express from 'express'
import apirouter from './route/auth/index.js'
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import postRouter from './route/post/index.js';
import adminRouter from './route/admin/index.js';
import functions from 'firebase-functions'
import cors from 'cors';

const app = express()
dotenv.config()
const port = process.env.PORT || 7777;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use("/api", apirouter)
app.use("/api/posts", postRouter)
app.use("/api/admin", adminRouter)


app.listen(port);
console.log('Server started at http://localhost:' + port);

const week17krs = functions.https.onRequest(app);
export default week17krs