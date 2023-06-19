import { NextResponse } from 'next/server'
import { createUser } from '../../../lib/user'

export async function POST(req, res) {
  if (req.method === "POST") {
    console.log(req.body)

    try {
      await createUser(req.body)
      return NextResponse.status(200).send({ done: true })
    } catch (error) {
      console.error(error)
      return NextResponse.status(500).end(error.message)
    }
  }
}

