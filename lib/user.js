import crypto from 'crypto'
import { PrismaClient } from "@prisma/client"
import { use } from 'passport'

export let sessionTokens = []
export async function createUser({ username, password, Fname, Lname, pfp }) {

  // TODO: DONT make if user alr exists!!
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

export async function findUser(username) {
  const prisma = new PrismaClient()
  let result = null
  result = (await prisma.USERS.findMany())

  let userObj = null
  let found = false
  result.forEach((user) => {
    if (user.Username === username) {
      found = true
      userObj = user
      return
    }
  })
  return userObj
}

export async function findQuiz({ quizName }) {
  const prisma = new PrismaClient()
  let result = null
  result = (await prisma.USERS.findMany())

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
export async function addToken(username) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(username, salt, 1000, 64, 'sha512')
    .toString('hex')

  let sessionToken = `${username} ${hash}`

  const prisma = new PrismaClient()
  let t = await prisma.SESSIONS.create({
    data: { sessioncookie: sessionToken }
  })
  sessionTokens.push(sessionToken)
  console.log(sessionTokens)
  return sessionToken
}
export async function validateSessionToken(token) {
  return sessionTokens.includes(token)
}


export async function validatePassword(user, inputPassword) {
  let arr = user.Password.split(" ")
  let passwordHash = arr[0]
  let salt = arr[1]

  const inputHash = crypto
    .pbkdf2Sync(inputPassword, salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = passwordHash === inputHash
  return passwordsMatch
}
export async function getUser(username){
  let userObj = await findUser(username)
  userObj.Password = null
  return userObj
}