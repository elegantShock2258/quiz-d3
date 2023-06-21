import { NextResponse } from 'next/server'
import { getLoginSession } from '../../../lib/auth'
import { findUser } from '../../../lib/user'

export async function GET(req, res) {
  try {
    const session = await getLoginSession(req)
    const user = (session && (await findUser(session))) ?? null

    NextResponse.json({ user })
  } catch (error) {
    console.error(error)
  }
}
