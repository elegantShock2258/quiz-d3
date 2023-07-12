import { NextResponse } from 'next/server'
import { findUser, getUser, removeUser } from '../../../lib/user'

export async function POST(req) {
  let data = await req.json()
  if (data.remove) {
    removeUser(data.token)
  } else if (data.read) {
    console.log("data.read is true")
    const [user, found] = await findUser(data.readUser)
    return NextResponse.json(found ? user : { message: "not found" })
  } else {
    try {
      //get user
      const [user, found] = await getUser(data.userToken)
      return NextResponse.json(found ? user : { message: "not found" })

    } catch (error) {
      console.error(error)
    }
  }
}

