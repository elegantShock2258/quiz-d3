import { NextResponse } from 'next/server'
import { getUser, removeUser } from '../../../lib/user'

export async function POST(req) {
  let data = await req.json()
  if (data.remove) {
    removeUser(data.token)
  } else {
    try {
      //get user
      const [user, found] = await getUser(data.username)
      return NextResponse.json(found ? user : {message:"not found"})

    } catch (error) {
      console.error(error)
    }
  }
}

