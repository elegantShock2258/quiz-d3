'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../../lib/hooks'
import Layout from '../components/layout'
import Form from '../components/form'
import './loginStyles.css'
const Login = () => {
  // useUser({ redirectTo: '/', redirectIfFound: true })

  let router = useRouter()
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    }

    // try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    console.log("helo", res.status)
    if (res.status === 200) {
      router.push("/")
    }

  }

  return (
    <>
      <div className="login">
        <div className="container">
          <h1> Login </h1>
          <form onSubmit={handleSubmit} className='container'>
            <input type="text" className="username" name="username" placeholder="Enter Username" required/>
            <input type="password" className="password" name="password" placeholder="Enter Password" required/>
            <button className='loginBtn' type="submit" >Login</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
