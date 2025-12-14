import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🧹 Cleaning up database...')
  
  // Delete in order of dependencies (child first)
  try {
    await prisma.profile.deleteMany({})
    await prisma.authProvider.deleteMany({})
    await prisma.enrollment.deleteMany({})
    await prisma.taskAssignment.deleteMany({})
    await prisma.user.deleteMany({})
    console.log('✅ Users and related data deleted')
  } catch (error) {
    console.error('Error deleting data:', error)
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
