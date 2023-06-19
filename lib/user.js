import crypto from 'crypto'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
let result = null
result = (await prisma.USERS.findMany())

export async function createUser({ username, password, Fname="fname", Lname="lname", pfp="f" }) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')
  const hashedPassword = `${hash} ${salt}`

  const newUserCreated = await prisma.USERS.create({
    data: {
      FirstName: Fname,
      LastName: Lname,
      Following: JSON.stringify([]),
      Followers: JSON.stringify([]),
      Score: 0,
      ProfilePic: pfp,
      Bio: "Enter your Bio",
      Username: username,
      Password: hashedPassword
    }
  })

  return newUserCreated
}

export async function findUser({ username }) {
  let found = false
  result.forEach((user) => {
    if (user.Username === username) found = true
  })

  return found
}

export async function findQuiz({ quizName }) {
  let found = false
  let quizObject = null
  result.forEach(user => {
    let userQuizObj = JSON.parse(user.QuizMade)
    userQuizObj.forEach(quizObj => {
      if (JSON.stringify(quizObj.id) === quizName) {
        quizObject = quizObj
        found = true
      }
    })
  })

  return { found, quizObject }
}




export function validatePassword(user, inputPassword) {
  let { passwordHash, salt } = user.Password.split(" ")

  const inputHash = crypto
    .pbkdf2Sync(inputPassword, salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = passwordHash === inputHash
  return passwordsMatch
}
