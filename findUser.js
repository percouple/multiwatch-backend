import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

export default function findUser() {

  const prisma = new PrismaClient()
  
  async function main() {
    // ... you will write your Prisma Client queries here
    const user = await prisma.users.findFirst({
      where: {
        username: 'bob',
      }
    })
    console.log(user)
    return user
  }
  
  const result = main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  
  return result;
}