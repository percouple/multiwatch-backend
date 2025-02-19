import { PrismaClient } from '@prisma/client'

export default async function getUserClocks(id) {

  const prisma = new PrismaClient()
  
  async function main() {
    const clocks = await prisma.clocks.findMany({
      where: {
        userId: id,
      }
    })
    return clocks;
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