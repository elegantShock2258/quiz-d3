import { createUser } from '../../../lib/user'

export async function POST(req) {
  let data = (await req.json())
  try {
    await createUser(data)
    return new Response('response', {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response('response', {
      status: 500,
    })
  }
}

