import prisma from '@lib/prisma'

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  await prisma.task.delete({ where: { id } })
  return Response.json({ success: true })
}
