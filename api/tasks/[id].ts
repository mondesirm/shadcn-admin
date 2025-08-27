import prisma from '../_lib/prisma.js'
import { mutatedTaskSchema, type Task } from '../_lib/schema.js'

export async function GET(req: Request) {
  const id = Number(new URL(req.url).searchParams.get('id'))

  const task = await prisma.task.findUnique({ where: { id } })
  if (!task) return Response.json({ error: 'Task not found' }, { status: 404 })

  return Response.json(task)
}

export async function PUT(req: Request) {
  const id = Number(new URL(req.url).searchParams.get('id'))
  const data = (await req.json()) as Task

  const { success, error } = mutatedTaskSchema.safeParse(data)
  if (!success) return Response.json({ error }, { status: 400 })

  const task = await prisma.task.findUnique({ where: { id } })
  if (!task) return Response.json({ error: 'Task not found' }, { status: 404 })

  const updated = await prisma.task.update({ where: { id }, data })
  return Response.json(updated)
}

export async function DELETE(req: Request) {
  const id = Number(new URL(req.url).searchParams.get('id'))

  const task = await prisma.task.findUnique({ where: { id } })
  if (!task) return Response.json({ error: 'Task not found' }, { status: 404 })

  const deleted = await prisma.task.delete({ where: { id } })
  return Response.json(deleted)
}
