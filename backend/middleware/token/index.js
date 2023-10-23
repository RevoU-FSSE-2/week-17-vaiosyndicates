import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config()

export const checkToken = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if(!authHeader) {
    return res.status(401).json({
      responseCode: 401,
      message: 'Unauthorized user'
    });
  } else {
    try {
      const token = authHeader.split(' ')[1]
      const decodeToken = jwt.verify(token, process.env.SECRET_JWT)
      if(decodeToken.role === "user") {
        next()
      } else {
        return res.status(401).json({
          responseCode: 401,
          message: 'Unauthorized user'
        });
      }

    } catch (error) {
      return res.status(400).json({
        responseCode: 400,
        message: error.message
      });
    }
  }
}

export const checkTokenAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization
  if(!authHeader) {
    return res.status(401).json({
      responseCode: 401,
      message: 'Unauthorized user'
    });
  } else {
    try {
      const token = authHeader.split(' ')[1]
      const decodeToken = jwt.verify(token, process.env.SECRET_JWT)
      if(decodeToken.role === "admin") {
        next()
      } else {
        return res.status(401).json({
          responseCode: 401,
          message: 'Unauthorized user'
        });
      }

    } catch (error) {
      return res.status(400).json({
        responseCode: 400,
        message: error.message
      });
    }
  }
}