import { PrismaClient } from '@prisma/client'
import { tasks } from './seeders/tasks'

const prisma = new PrismaClient()

async function main() {
  const seeders = {
    task: tasks,
  }

  await prisma.$transaction(
    Object.entries(seeders).map(([model, data]) => {
      // eslint-disable-next-line no-console
      console.log(`\x1b[32mSeeding ${model} x${data.length}\x1b[0m`)
      return prisma[model as keyof typeof seeders].createMany({ data })
    })
  )
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
