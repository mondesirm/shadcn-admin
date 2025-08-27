import data from './_data.ts'
import prisma from '../_lib/prisma'
import { taskSchema } from '../_lib/schema'

export async function GET() {
  // eslint-disable-next-line no-console
  console.log(data)
  const tasks = await prisma.task.findMany()
  // Validate with zod
  const safeTasks = tasks
    .map((t) => (taskSchema.safeParse(t).success ? t : null))
    .filter(Boolean)
  return Response.json(safeTasks)
}

export async function POST(req: Request) {
  const body = await req.json()
  // Accept single or array
  const tasks = Array.isArray(body) ? body : [body]
  // Validate each task
  const validTasks = tasks.filter((t) => taskSchema.safeParse(t).success)
  // Remove id if present (let DB generate)
  const data = validTasks.map(({ id, ...rest }) => rest)
  const created = await prisma.task.createMany({ data })
  return Response.json({ count: created.count })
}
