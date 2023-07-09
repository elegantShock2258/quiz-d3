'use client'
import { getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState } from 'react';
import DefaultPage from './defalutPages/defaultRootPage';
import { removeUser } from '../lib/user';

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
            body: JSON.stringify({ username: username, remove: false }),
        }).then((data) => {
            return data
        })
        user = await res.json()

        let logout = async (e) => {
            deleteCookie('token')
            const res = await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: userToken, remove: true }),
            }).then((data) => {
                return data
            })
            window.location.reload()
        }

        function createQuiz(){
            window.location = '/createQuiz'
        }


        return <>
                <button onClick={logout}>Logout</button>
                <p>Currently logged in as:</p>
                <span>{user.FirstName}</span>
                <button onClick={createQuiz}> create quiz</button>
        </>
    } else {
        return <>
            <DefaultPage />
        </>
    }

}





export default Home