'use client'
import { useState } from 'react'
import './styles.css'





// for UI:
// make a central layout where it asks your:
// 1) Fname,Lastname
// 2) username, password
// 3) pfp
// 4) ppl to follow (like insta)
// 5) quiz to attempt (make it like 4)
// 6) topics to make quiz in 

export default function Signup() {

    let Lname ="",
        Fname  = "",
        username= "",
        password = "",
        repass = "",
        pfp = "";

    function handleSubmitNames(e){
        Fname = e.currentTarget["0"].value
        Lname = e.currentTarget["1"].value

        console.log(Fname,Lname)
        setCounter(1)
    }
    function AskNames() {
        return <>
            <div className='AskNames'>
                <div className='container'>
                    <form onSubmit={handleSubmitNames}>
                        <h1>Let us know you</h1>
                        <div className='inputs'>
                            <div className='fnameInput'>
                                <input name="fname" type="text" placeholder='Enter Your First Name' required></input>
                            </div>
                            <div className='lnameInput'>
                                <input name="lname" type="text" placeholder='Enter Your Last Name' required></input>
                            </div>
                        </div>
                        <button type="submit">Next</button>
                    </form>
                </div>
            </div >
        </>
    }

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

    if (counter == 0) {
        return <>
            <AskNames />
        </>
    }

}