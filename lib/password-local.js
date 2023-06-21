import { findUser, validatePassword } from './user'

export async function validateLocal(username, password, done) {
  console.log(username,password,done)
  let user = await findUser({ username })
  if (user && validatePassword(user, password)) {
    done(user)
  } else {
    done(new Error('Invalid username and password combination'))
  }

}
