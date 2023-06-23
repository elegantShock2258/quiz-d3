import { NextResponse } from 'next/server'
import { getLoginSession } from '../../../lib/auth'
import { findUser, getUser } from '../../../lib/user'

export async function POST(req) {
  try {
    let data = await req.json()
    const session = await getLoginSession(req)
    const user = await getUser(data.username)
    return NextResponse.json(user)
  } catch (error) {
    console.error(error)
  }
}

