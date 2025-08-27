import { type VercelRequest } from '@vercel/node'
import prisma from '../_lib/prisma.js'
import { taskSchema } from '../_lib/schema.js'

export async function GET() {
  const tasks = await prisma.task.findMany()
  // Validate with zod
  const safeTasks = tasks
    .map((t) => (taskSchema.safeParse(t).success ? t : null))
    .filter(Boolean)
  return Response.json(safeTasks)
}

export async function POST(req: VercelRequest) {
  const p = new URL(req.url!).searchParams
  const { id, ...body } = Object.fromEntries(p)
  const tasks = Array.isArray(body) ? body : [body]
  /* eslint-disable no-console */
  console.log('req.url', req.url)
  console.log('p', p)
  console.log('body', body)
  /* eslint-enable no-console */

  // Validate each task
  const validated = tasks.filter((t) => taskSchema.safeParse(t).success)
  // Remove id if present (let DB generate)
  const data = validated.map(({ id, ...rest }) => rest)

  const created = await prisma.task.createMany({ data })
  // eslint-disable-next-line no-console
  console.log('created', created)
  return Response.json(created)
}

export async function DELETE(req: VercelRequest) {
  const ids = new URL(req.url!).searchParams.get('id')?.split(',') || []

  const deleted = await prisma.task.deleteMany({ where: { id: { in: ids } } })
  return Response.json(deleted)
}
