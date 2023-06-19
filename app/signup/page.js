'use client'
import { useState } from 'react'
import Router from 'next/router'
import { useUser } from '../../lib/hooks'
import Layout from '../components/layout'
import Form from '../components/form'
import { createUser } from '../../lib/user'

const Signup = () => {
  useUser({ redirectTo: '/', redirectIfFound: true })

  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')

    const body = {
      Fname: e.currentTarget.Fname.value,
      Lname: e.currentTarget.Lname.value,
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
      pfp: e.currentTarget.pfp.value,
    }
    createUser(body)
    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`)
      return
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })


      if (res.status === 200) {
        console.log("ok")
        Router.push('/login')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }

  return (
    <Layout>
      <div className="login">
        <Form isLogin={false} errorMessage={errorMsg} onSubmit={handleSubmit} />
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

export default Signup