'use client'
import { getCookie } from 'cookies-next';
import { useState } from 'react';
import dynamic from 'next/dynamic'
const Home = async () => {
    // check if cookie exists
    let userToken = getCookie('token')
    let [foundUser, setFoundUser] = useState(userToken != undefined)
    let user = null
    if (foundUser) {
        let username = userToken.split(" ")[0].replace("\"", "")
        const res = await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username }),
        }).then((data) => {
            return data
        })
        user = await res.json()
        return <>
            <p>Currently logged in as:</p>
            <pre>{user.FirstName}</pre>
        </>
    } else {
        return <>
            <p> default page fcds</p>
        </>
    }

}





export default Home