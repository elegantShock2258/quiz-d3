import { NextResponse } from 'next/server'
import { createUser } from '../../../lib/user'

export async function POST(req) {
  let data = (await req.json())
  try {
    await createUser(data)
    return NextResponse.status(200).send({ done: true })
  } catch (error) {
    console.error(error)
    return NextResponse.status(500).end(error.message)
  } finally {
    return NextResponse.json({ hmm: "hmm" })
  }
}

