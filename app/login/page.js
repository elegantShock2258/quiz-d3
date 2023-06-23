'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../../lib/hooks'
import Layout from '../components/layout'
import Form from '../components/form'

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
    
    // } catch (error) {
    //   console.error('An unexpected error happened occurred:', error)
    //   setErrorMsg(error.message)
    // }
  }

  return (
    <Layout>
      <div className="login">
        <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  )
}

export default Login
