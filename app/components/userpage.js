'use client'
import { useEffect } from 'react'
import Head from 'next/head'
import './userpageStyles.css'
const UserPage = (props) => {
    if (props.user != -1) {
        console.log(props.user)
        let QuizMade = JSON.parse(props.user.QuizMade)

        useEffect(() => {
            document.title = `${props.user.FirstName} ${props.user.LastName}`
        })

        return <div className='parent'>
            <div className="profileInfo">
                <img src={props.user.ProfilePic} id="pfp"></img>
                <div className="profileData">
                    <div className="username">
                        <div className="Name">{props.user.FirstName} {props.user.LastName}</div>
                        {/* TODO: implement follow requests */}
                        <button className="followBtn">Follow</button>
                    </div>
                    <div className="dataBar">
                        <span className='quizMade'><span className="num">{JSON.parse(props.user.QuizMade).length}</span> Quizes Made </span>
                        <span className='followers'><span className="num">{JSON.parse(props.user.Followers).length}</span> Followers </span>
                        <span className='following'><span className="num">{JSON.parse(props.user.Following).length}</span> Following</span>
                    </div>

                    <div className="bioContainer">
                        <div className="Score">Score: <span>{props.user.Score}</span></div>
                        <div className="Bio">{props.user.Bio}</div>
                    </div>
                </div>
            </div>
            <div className="QuizView">
                {(QuizMade.length != 0) &&
                    // TODO:implement
                    <h1> Quizes Made </h1>
                }

                {(QuizMade.length == 0) &&
                    <h1> No Quizes Made </h1>
                }
            </div>
        </div>
    } else {
        return <center>user not found!</center>
    }
}
export default UserPage