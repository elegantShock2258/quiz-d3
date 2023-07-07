import { findQuiz } from "../../../lib/user"
import { NextResponse } from 'next/server'
export async function POST(req) {
    let data = await req.json()
    try {
        const [found, quiz, userCreated] = await findQuiz(data.quizName)
        return NextResponse.json(found ? [found,quiz,userCreated] : { message: "not found" })
    } catch (error) {
        console.error(error)
    }
}

