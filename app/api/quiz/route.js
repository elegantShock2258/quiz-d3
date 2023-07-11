import { addQuiz, findQuiz, putAttempt } from "../../../lib/user"
import { NextResponse } from 'next/server'
export async function POST(req) {
    let data = await req.json()
    if(data.submit){
        // console.log("put attempt hua? ",data)
        let response = await putAttempt(data.attempt,data.quizId,data.userCreated)
        return NextResponse.json(response)
    }
    if(data.create){
        let res = await addQuiz(data.quiz,data.user)
        return NextResponse.json(res)
    }
    try {
        const [found, quiz, userCreated] = await findQuiz(data.quizName)
        return NextResponse.json(found ? [found,quiz,userCreated] : { message: "not found" })
    } catch (error) {
        console.error(error)
    }
}

