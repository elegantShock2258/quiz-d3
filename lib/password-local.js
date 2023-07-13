import { findUser, validatePassword } from './user'

export async function validateLocal(username, password, done) {
  let [user,found] = await findUser(username)
  if (user && validatePassword(user, password)) {
    done(user)
  } else {
    done(new Error('Invalid username and password combination'))
  }

}
