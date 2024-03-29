'use client'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AnimatePresence } from "framer-motion";

import './userpageStyles.css'

const UserPage = (props) => {
    if (props.user != -1) {
        console.log(props.user)
        let QuizMade = JSON.parse(props.user.QuizMade)
        let quizzes = []

        let initialAnimVariantDown = {
            hidden: {
                opacity: 0, y: -20
            },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }
        let initialAnimVariantUp = {
            hidden: {
                opacity: 0, y: 40
            },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }

        useEffect(() => {
            document.title = `${props.user.FirstName} ${props.user.LastName}`
        })

        async function follow(e) {
            // check if cookie exists
            let userToken = getCookie('token')
            let foundUser = (userToken != null && userToken != undefined)
            let user = null


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
                    const res = await fetch('/api/user', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userToken: userToken, follow: props.user.Username }),
                    }).then((data) => {
                        return data
                    })
                }
            }
        }

        return <AnimatePresence mode="wait">
            <motion.div className='parent' initial="hidden" animate="visible" >
                <motion.div className="profileInfo" >
                    <motion.img src={props.user.ProfilePic}
                        variants={initialAnimVariantDown}
                        id="pfp"></motion.img>
                    <motion.div variants={initialAnimVariantDown} className="profileData">
                        <motion.div variants={initialAnimVariantDown} className="username">
                            <motion.div variants={initialAnimVariantDown} className="Name">{props.user.FirstName} {props.user.LastName}</motion.div>
                            {/* TODO: implement follow requests */}
                            <motion.button variants={initialAnimVariantDown} whileHover={{ backgroundColor: "black", color: "white", border: "1px solid white", borderRadius: "14px" }} transition={{ duration: 2, ease: "linear", type: "tween" }} onClick={follow} className="followBtn">Follow</motion.button>

                        </motion.div>
                        <motion.div variants={initialAnimVariantDown} className="dataBar">
                            <span variants={initialAnimVariantUp} className='quizMade'><span className="num">{JSON.parse(props.user.QuizMade).length}</span> Quizes Made </span>
                            <span variants={initialAnimVariantUp} className='followers'><span className="num">{JSON.parse(props.user.Followers).length}</span> Followers </span>
                            <span variants={initialAnimVariantUp} className='following'><span className="num">{JSON.parse(props.user.Following).length}</span> Following</span>
                        </motion.div>

                        <motion.div variants={initialAnimVariantDown} className="bioContainer">
                            <motion.div variants={initialAnimVariantUp} className="Score">Score: <span>{props.user.Score}</span></motion.div>
                            <motion.div variants={initialAnimVariantUp} className="Bio">{props.user.Bio}</motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
                <motion.div variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }} className="QuizView">
                    {(QuizMade.length != 0) &&
                        // TODO:implement
                        <>
                            <motion.h1> Quizes Made </motion.h1>
                        </>

                    }

                    {(QuizMade.length == 0) &&
                        <motion.h1> No Quizes Made </motion.h1>
                    }
                </motion.div>
            </motion.div>
        </AnimatePresence >
    } else {
        return <center>user not found!</center>
    }
}
export default UserPage