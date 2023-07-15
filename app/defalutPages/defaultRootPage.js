'use client'
import { useState } from 'react'
import './stylesDefault.css'
import { useRouter } from 'next/navigation'
export default function DefaultPage() {
    let [quidIdInput, setQuizIdInput] = useState()
    let [dialogOpen, setDialogOpen] = useState(false)
    let router = useRouter()

    function noQuizId() {
        setDialogOpen(true)
    }
    return <>
        <div className='navbar'><span className='login loginBtn' onClick={() => { window.location = "/login" }}>login</span></div >
        <div className='container'>
            <h1 className='quiz'>Quiz!</h1>
            <div className='quizId'>
                <input type='text' id='quiz' value={quidIdInput} onChange={(e) => setQuizIdInput(e.target.value)} placeholder='Quiz Id' />
                <div className='button' onClick={() => { (quidIdInput != undefined) ? window.location = `/q${quidIdInput}` : noQuizId() }}>Enter</div>
                
                <dialog open={dialogOpen}>
                    <h1>{"Please Enter A Quiz ID"}</h1>
                        <button onClick={()=>{setDialogOpen(false)}} autoFocus>
                            Close
                        </button>
                </dialog>
            </div>
        </div>
    </>
}