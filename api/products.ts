export async function GET() {
  const response = await fetch('https://api.vercel.app/products')
  const products = await response.json()
  return Response.json(products)
}

export async function POST(req: Request) {
  const data = await req.json()
  return Response.json({ message: 'Product created', data })
}
