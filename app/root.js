'use client'
import { getCookie, deleteCookie } from 'cookies-next';
import { useState } from 'react';
import DefaultPage from './defalutPages/defaultRootPage';
import './rootPageStyles.css'

async function QuizFeed(props) {
    let user = props.user
    let element = []

    let quizzes = []

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }


    for (let i = 0; i < JSON.parse(user.Following).length; i++) {
        let followingUser = JSON.parse(user.Following)[i]
        console.log(followingUser)
        let userToken = getCookie('token')
        const res = await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userToken: userToken, read: true, readUser: followingUser }),
        }).then((data) => {
            return data
        })
        let thisUserData = await res.json()
        let quizMade = JSON.parse(thisUserData.QuizMade)
        quizMade.forEach((quiz) => {
            quizzes.push(
                <QuizCard thisUserData={thisUserData} quiz={quiz} />
            )
        })
    }


    // enter recc algo here
    shuffleArray(quizzes)


    return <>
        {quizzes}
    </>


}
export function QuizCard({ thisUserData, quiz }) {
    return <div className='quizCard' onClick={() => { window.location = `/q${quiz.id}` }}>
        <div className='nav'>
            <img src={thisUserData.ProfilePic}></img>
            <div className='quizTitle'>{quiz.title}</div>
            <span><div className='username'>@{thisUserData.Username}</div></span>
        </div>
        <div className='quizInfo'>
            <div className='time'>Quiz time: <span className='time'>{`${quiz.time > 3600 ? `${Math.floor(quiz.time / 3600)}:` : ""} ${Math.floor(quiz.time / 60) % 60}:${quiz.time % 60}`}</span></div>
            <div className='number'>Questions: <span className='number'>{quiz.questions.length}</span></div>
            <div className='attempts'>Attempts: <span className='number'>{quiz.attempts.length}</span></div>
        </div>
        {/* TODO: make more pretty */}
        <div className='quizMetadata'>
            <div className='topics'>Topics: {JSON.stringify(quiz.topics).replace("[", "").replace("]", "").replaceAll(",", " ").replaceAll("\"", "")}</div>
            <div className='tags'>Tags: {JSON.stringify(quiz.hashtags).replace("[", "").replace("]", "").replaceAll(",", " ").replaceAll("\"", "")}</div>
        </div>
    </div>
}
const Home = async () => {
    // check if cookie exists
    let userToken = getCookie('token')
    let [foundUser, setFoundUser] = useState(userToken != null && userToken != undefined)
    let user = null

    console.log(userToken)

    if (foundUser && userToken != null && userToken != undefined) {
        const res = await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userToken: userToken, remove: false }),
        }).then((data) => {
            return data
        })
        user = await res.json()
        if (user.Username != "Anonymous") {
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

            function createQuiz() {
                window.location = '/createQuiz'
            }


            return <>
                <div className='navBar'> <img src={user.ProfilePic}></img><div className='info'><div className='name'>{user.FirstName} {user.LastName}</div> <div className='username'>@{user.Username}</div></div><button className='logout' onClick={logout}>Logout</button> </div>
                <div className='feed'>
                    <div className='lookText'>Try some quizzes!</div>
                    <QuizFeed user={user} />
                </div>
                <button className='addQuiz' onClick={createQuiz}>+</button>
            </>
        }
    } else {
        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ anon: true }),
        })
    }
    return <>
        <DefaultPage />
    </>


}





export default Home