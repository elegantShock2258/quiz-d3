'use client'
import { getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DefaultPage from './defalutPages/defaultRootPage';

const Home = async () => {
    // check if cookie exists
    let userToken = getCookie('token')
    let [foundUser, setFoundUser] = useState(userToken != null && userToken != undefined)
    let user = null
    
    if (foundUser && userToken != null) {
        let username = userToken.split(" ")[0].replace("\"", "")
        const res = await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username }),
        }).then((data) => {
            return data
        })
        user = await res.json()

        let logout = (e) => {
            deleteCookie('token')
            window.location.reload()
        }
        return <>
            <button onClick={logout}>Logout</button>
            <p>Currently logged in as:</p>
            <pre>{user.FirstName}</pre>
        </>
    } else {
        return <>
            <DefaultPage/>
        </>
    }

}





export default Home