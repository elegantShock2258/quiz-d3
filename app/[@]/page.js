'use client'
import { usePathname } from "next/navigation"

import UserPage from "../components/userpage"
import QuizPage from "../components/quizpage"
import { useEffect } from "react";
import { findQuiz, findUser } from "../../lib/user"

const Page = async () => {
    const pathname = usePathname()

    if (pathname[1] === '@') {
        let username = pathname.slice(2)
        'use server'
        let [currentUser,found] = await findUser(username)
        if (found && currentUser != undefined) {
            return (
                <UserPage user={currentUser} ></UserPage>
            )
        } else {
            return (<UserPage user={-1}></UserPage>)
        }
    } else if (pathname[1] === 'q') {
        let quizName = pathname.slice(2)

        'use server'
        let [found,quizObject,userCreated] = await findQuiz(quizName)
        if (found) {
            return (
                <QuizPage quiz={quizObject} userCreated={userCreated}></QuizPage>
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