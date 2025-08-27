/* eslint-disable no-console */
import { PrismaClient } from 'generated/prisma/client'
import { taskSeeder as task } from '@/features/tasks/data/seeder'

const prisma = new PrismaClient()

async function main() {
  const seeders = { task }

  await prisma.$transaction(
    Object.entries(seeders).map(([model, data]) => {
      console.log(`\x1b[32m🌱 ${model} x${data.length}\x1b[0m`)
      return prisma[model as keyof typeof seeders].createMany({
        // Remove id if present (let DB generate)
        data: data.map(({ id, ...rest }) => rest),
      })
    })
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
