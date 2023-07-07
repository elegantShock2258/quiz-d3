'use client'

import React, { } from "react";
import { usePathname } from "next/navigation"
import UserPage from "../components/userpage"
import QuizPage from "../components/quizpage"

export default async function Page() {
    let returnElement = (<>
        <h1>404!</h1>
    </>)
    const pathname = usePathname()
    let currentUser = null
    if (pathname[1] === '@') {
        let username = pathname.slice(2)
        const res = await fetch('http://localhost:3000/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, remove: false }),
        }, { cache: 'no-store' })
        currentUser = await res.json()

        if (currentUser != undefined) {
            return (
                <UserPage user={currentUser} ></UserPage>
            )
        } else {
            return (<UserPage user={-1}></UserPage>)
        }
    } else if (pathname[1] === 'q') {
        let quizName = pathname.slice(2)
        const res = await fetch('http://localhost:3000/api/quiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quizName: quizName, remove: false }),
        }, { cache: 'no-store' })
        let [found, quizObject, userCreated] = await res.json()
        if (found) {
            return (
                <QuizPage quiz={quizObject} userCreated={userCreated}></QuizPage>
            )
        } else {
            return (<QuizPage quiz={-1}></QuizPage>)
        }
    }
    return returnElement

}