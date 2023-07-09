import crypto from 'crypto'
import { PrismaClient } from "@prisma/client"

export let sessionTokens = []
export async function createUser(data) {
  // TODO: DONT make if user alr exists!!
  const prisma = new PrismaClient()
  let result = null
  result = (await prisma.USERS.findMany())

  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(data.Password, salt, 1000, 64, 'sha512')
    .toString('hex')
  const hashedPassword = `${hash} ${salt}`

  const newUserCreated = await prisma.USERS.create({
    data: {
      FirstName: data.Fname,
      LastName: data.Lname,
      Following: JSON.stringify([]),
      Followers: JSON.stringify([]),
      QuizMade: JSON.stringify([]),
      QuizAttempted: JSON.stringify([]),
      Score: 0,
      ProfilePic: data.pfp,
      Bio: "Enter your Bio",
      Username: data.Username,
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

  let userObj = undefined
  let found = false
  result.forEach((user) => {
    if (user.Username === username) {
      found = true
      userObj = user
      return
    }
  })
  userObj.Password = null
  return [userObj, found]
}

export async function findQuiz(quizName) {
  const prisma = new PrismaClient()
  let result = null
  result = (await prisma.USERS.findMany())

  let found = false
  let quizObject = null
  let userCreater = null
  result.forEach(user => {
    let userQuizObj = JSON.parse(user.QuizMade)
    userQuizObj.forEach(quizObj => {
      if ((quizObj.id.toString()) === quizName) {
        quizObject = quizObj
        userCreater = user
        found = true
        return
      }
    })
  })
  userCreater.Password = null
  return [found, quizObject, userCreater]
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

export async function putAttempt(attempt, id, userCreated) {
  let quizMade = JSON.parse(userCreated.QuizMade)
  console.log(id, userCreated, attempt)
  quizMade.forEach((quizObj) => {
    if (quizObj.id === id) {
      quizObj.attempts.push(attempt)
      // console.log("found! ",quizMade)
    }
  })
  // push quizMade to database
  const prisma = new PrismaClient()
  const updateQuizMade = await prisma.USERS.update({
    where: {
      Username: userCreated.Username,
    },
    data: {
      QuizMade: JSON.stringify(quizMade)
    }
  })
  return updateQuizMade
}
// TODO: delete quiz,add quiz
export async function addQuiz(quizObj, userCreated) {
  let quizMade = JSON.parse(userCreated.QuizMade)
  quizMade.push(quizObj)

  const prisma = new PrismaClient()
  const updateQuizMade = await prisma.USERS.update({
    where: {
      Username: userCreated.Username,
    },
    data: {
      QuizMade: JSON.stringify(quizMade)
    }
  })
  return updateQuizMade
}

export async function validatePassword(user, inputPassword) {
  console.log("password: ", user)
  let arr = user.Password.split(" ")
  let passwordHash = arr[0]
  let salt = arr[1]

  const inputHash = crypto
    .pbkdf2Sync(inputPassword, salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = passwordHash === inputHash
  return passwordsMatch
}
export async function getUser(username) {
  let userObj = await findUser(username)
  userObj.Password = null
  return userObj
}

export async function removeUser(token) {
  const prisma = new PrismaClient()
  await prisma.SESSIONS.delete({
    where: {
      sessioncookie: token
    }
  })

  console.log("removed ", token)
  sessionTokens.splice(sessionTokens.indexOf(token), 1)
}