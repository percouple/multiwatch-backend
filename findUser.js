import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

export default async function findUser(username) {

  const prisma = new PrismaClient()
  
  async function main() {
    const user = await prisma.users.findFirst({
      where: {
        username: username,
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