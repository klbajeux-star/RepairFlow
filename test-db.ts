import { PrismaClient } from './src/generated/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const users = await prisma.user.findMany({
      where: { isActive: true },
      select: { id: true, name: true, role: true, color: true },
    })
    console.log('USERS_COUNT:', users.length)
    console.log('FIRST_USER:', users[0]?.name)
  } catch (err) {
    console.error('PRISMA_ERROR:', err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
