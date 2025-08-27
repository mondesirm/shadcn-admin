import { z } from 'zod'
import prisma from '../_lib/prisma.js'
import { mutatedTaskSchema, taskSchema, type Task } from '../_lib/schema.js'

export async function GET() {
  const tasks = await prisma.task.findMany()

  // Validate with zod
  const validated = tasks.filter((t) => taskSchema.safeParse(t).success)
  return Response.json(validated)
}

export async function POST(req: Request) {
  const payload = (await req.json()) as Task
  const tasks = Array.isArray(payload) ? payload : [payload]

  // Validate each task
  const validated = tasks.filter((t) => mutatedTaskSchema.safeParse(t).success)
  // Remove id if present (let DB generate)
  const data = validated.map(({ id, ...rest }) => rest) as Task[]

  const created = await prisma.task.createMany({ data })
  return Response.json(created)
}

export async function DELETE(req: Request) {
  const { ids } = (await req.json()) as { ids: number[] }

  const { success, error } = z.array(taskSchema.shape.id).safeParse(ids)
  if (!success) return Response.json({ error }, { status: 400 })

  const deleted = await prisma.task.deleteMany({ where: { id: { in: ids } } })
  return Response.json(deleted)
}
