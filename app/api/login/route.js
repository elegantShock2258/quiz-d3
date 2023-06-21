import { validateLocal } from '../../../lib/password-local'

export async function POST(req) {
  let data = await req.json()
  validateLocal(data.username, data.password, (e) => { console.log("Logged In", e) })

  // makeup cookie 
  // add to sessionsTable

}