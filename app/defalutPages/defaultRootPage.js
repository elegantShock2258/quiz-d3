'use client'
import { useState } from 'react'
import './stylesDefault.css'
import { useRouter } from 'next/navigation'
export default function DefaultPage() {
    let [quidIdInput, setQuizIdInput] = useState()
    let router = useRouter()
    return <>
        <div className='navbar'><span className='login'>login</span></div >
        <div className='container'>
            <h1 className='quiz'>Quiz!</h1>
            <div className='quizId'>
                <input type='text' id='quiz' value={quidIdInput} onChange={(e) => setQuizIdInput(e.target.value)} placeholder='Quiz Id' />
                <div className='button' onClick={() => { window.location = `/q${quidIdInput}` }}>Enter</div>
            </div>
        </div>
    </>
}