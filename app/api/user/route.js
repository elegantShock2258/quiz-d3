import { NextResponse } from 'next/server'
import { getLoginSession } from '../../../lib/auth'
import { findUser, getUser, removeUser } from '../../../lib/user'

export async function POST(req) {
  let data = await req.json()
  if (data.remove) {
    removeUser(data.token)
  } else {
    try {
      const session = await getLoginSession(req)
      const [user, found] = await getUser(data.username)
      return NextResponse.json(user)
    } catch (error) {
      console.error(error)
    }
  }
}

