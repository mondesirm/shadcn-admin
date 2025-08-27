import { type VercelRequest } from '@vercel/node'
import prisma, { type Task } from '../_lib/prisma.js'

export async function GET(req: VercelRequest) {
  const id = new URL(req.url!).searchParams.get('id') || ''

  const task = await prisma.task.findUnique({ where: { id } })
  if (!task) return Response.json({ error: 'Task not found' }, { status: 404 })

  return Response.json(task)
}

export async function PUT(req: Request) {
  const id = new URL(req.url!).searchParams.get('id') || ''
  const data = (await req.json()) as Task

  const task = await prisma.task.findUnique({ where: { id } })
  if (!task) return Response.json({ error: 'Task not found' }, { status: 404 })

  const updated = await prisma.task.update({ where: { id }, data })
  return Response.json(updated)
}

export async function DELETE(req: VercelRequest) {
  const id = new URL(req.url!).searchParams.get('id') || ''

  const task = await prisma.task.findUnique({ where: { id } })
  if (!task) return Response.json({ error: 'Task not found' }, { status: 404 })

  const deleted = await prisma.task.delete({ where: { id } })
  return Response.json(deleted)
}
