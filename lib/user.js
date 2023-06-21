import crypto from 'crypto'
import { PrismaClient } from "@prisma/client"
import { use } from 'passport'

export async function createUser({ username, password, Fname, Lname, pfp }) {
  const prisma = new PrismaClient()
  let result = null
  result = (await prisma.USERS.findMany())

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
      QuizMade: JSON.stringify([]),
      QuizAttempted: JSON.stringify([]),
      Score: 0,
      ProfilePic: pfp,
      Bio: "Enter your Bio",
      Username: username,
      Password: hashedPassword
    }
  })
  console.log(newUserCreated)

  return JSON.stringify(newUserCreated)
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




export async function validatePassword(user, inputPassword) {
  let { passwordHash, salt } = user.Password.split(" ")

  const inputHash = crypto
    .pbkdf2Sync(inputPassword, salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = passwordHash === inputHash
  return passwordsMatch
}
