'use client'
import { useState } from 'react'
import Form from '../components/form'
import Layout from '../components/layout'
import { createUser } from '../../lib/user'
import { motion } from "framer-motion"
import './styles.css'
import Image from 'next/image'
import quizPic from './quiz.png'
let Lname, Fname, username, password, pfp = "";




// for UI:
// make a central layout where it asks your:
// 1) Fname,Lastname
// 2) username, password
// 3) pfp
// 4) ppl to follow (like insta)
// 5) quiz to attempt (make it like 4)
// 6) topics to make quiz in 
function AskNames() {
    return <>
        <div className='namesContainer'>
            <div className='imageContainer'>
                <Image src={quizPic} />
            </div>
            <div className='regContainer'>
                <div>
                    <h1 className='signupText'>Sign Up</h1>
                </div>
                <div className='buttonContainer'>
                    <motion.button whileHover={{ scale: 1.1, color: "#efefef", borderRadius: "20px" }} >Register Now</motion.button>
                </div>
            </div>
        </div>
    </>
}

export default function Signup() {
    const [counter, setCounter] = useState(0)
    const [errorMsg, setErrorMsg] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        if (errorMsg) setErrorMsg('')

        const body = {
            Fname: e.currentTarget.Fname.value,
            Lname: e.currentTarget.Lname.value,
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
            pfp: ""
        }
        if (body.password !== e.currentTarget.rpassword.value) {
            setErrorMsg(`The passwords don't match`)
            return
        }
        let res = null
        res = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        if (res.status === 200) {
            console.log("ok")
            // Router.push('/login')
        }
    }

    return <Layout>
        <div className="login">
            <Form isLogin={false} errorMessage={errorMsg} onSubmit={handleSubmit} counter={counter} />
        </div>
    </Layout>

}