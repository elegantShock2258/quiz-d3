import { NextResponse } from 'next/server'
import { validateLocal } from '../../../lib/password-local'
import { cookies } from 'next/headers'
import { addToken } from '../../../lib/user'

export async function POST(req, r11) {
  let data = await req.json()
  if (data.anon) {
    const res = NextResponse.next()

    let sessionToken = await addToken("Anonymous")
    res.cookies.set('session', sessionToken)
    cookies().set("token", sessionToken)

    return new Response('response', {
      status: 200,
    })
  }
  validateLocal(data.username, data.password, (e) => { console.log("Logged In", e) })
  console.log(data)
  // makeup cookie 

  req.cookies.getAll()

  const res = NextResponse.next()
  // add to sessionsTable

  let sessionToken = await addToken(data.username)
  res.cookies.set('session', sessionToken)
  cookies().set("token", sessionToken)

  return new Response('response', {
    status: 200,
  })
}