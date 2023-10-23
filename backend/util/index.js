import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config()

export const respHelper = (rc, data) => {
  const resp = {
    responseCode: rc,
    message: 'Success',
    data: data
  }

  return resp
}

export const generateAccessToken = (data) => {
  const token = jwt.sign({id: data.data.id ,name: data.data.name, role: data.data.role}, process.env.SECRET_JWT, { expiresIn: "5m" })
  return token
}

export const generateRefreshToken = (data) => {
  const token = jwt.sign({id: data.data.id, name: data.data.name, role: data.data.role}, process.env.SECRET_JWT, { expiresIn: "1d" })
  return token
}