'use client'
import { usePathname } from "next/navigation"
import { PrismaClient } from "@prisma/client"

import UserPage from "../components/userpage"
import QuizPage from "../components/quizpage"
import { useEffect } from "react";

const Page = async () => {
    const pathname = usePathname()
    console.log(pathname)
    const prisma = new PrismaClient()
    let result = null

        result = (await prisma.USERS.findMany())

    console.log(result)


    if (pathname[1] === '@') {
        let username = pathname.slice(2)
        let found = false
        let currentUser = null
        result.forEach(user => {
            console.log(user.Username)
            if (user.Username === username) {
                found = true
                currentUser = user
            }
        })
        if (found && currentUser != undefined) {
            return (
                <UserPage user={currentUser} ></UserPage>
            )
        } else {
            return (<UserPage user={-1}></UserPage>)
        }
    } else if (pathname[1] === 'q') {
        let quizName = pathname.slice(2)

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

        if (found) {
            return (
                <QuizPage quiz={quizObject}></QuizPage>
            )
        } else {
            return (<QuizPage quiz={-1}></QuizPage>)
        }
    } else {
        return <>
            <h1>404!</h1>
        </>
    }
}
export default Page