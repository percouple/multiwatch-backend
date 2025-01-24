import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

export default async function findUser(userId) {

  const prisma = new PrismaClient()
  
  async function main() {
    console.log(userId)
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      }
    })
    return user;
  }

  return main()
  .then(async (result) => {
    await prisma.$disconnect()
    return result;
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  
}