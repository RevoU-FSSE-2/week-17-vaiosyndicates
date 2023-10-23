import { PrismaClient } from '@prisma/client'
import { respHelper } from '../../util/index.js'

const prisma = new PrismaClient()

export const getUser = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      role: true
    },
  })

  return users
}

export const postUser = async (data) => {
  // console.log(prisma)
  const users = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      address: data.address,
      password: data.password,
      role: data.role
    },
  })

  return respHelper(200)
}

export const checkUserbyEmail = async (data) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data,
    },
  })

  if(user !== null) {
    return respHelper(200, user)
  } else {
    return respHelper(404)
  }
}

export const resetPassword = async (data) => {
  const updateUser = await prisma.user.update({
    where: {
      id: data.id,
      email: data.email
    },
    data: {
      password: data.password,
    },
  })

  return respHelper(200)
}

