// 'use client'
// import Router from 'next/navigation'
// import { useUser } from '../../lib/hooks'
// import Layout from '../components/layout'
// import Form from '../components/form'
// import { createUser } from '../../lib/user'
// import { useEffect } from 'react'

// const Signup = () => {
//   useUser({ redirectTo: '/', redirectIfFound: true })

//   const [errorMsg, setErrorMsg] = useState('')

//   function handleSubmit(e) {
//     e.preventDefault()

//     if (errorMsg) setErrorMsg('')

//     const body = {
//       // Fname: e.currentTarget.Fname.value,
//       // Lname: e.currentTarget.Lname.value,
//       username: e.currentTarget.username.value,
//       password: e.currentTarget.password.value,
//       // pfp: e.currentTarget.pfp.value,
//     }
//     if (body.password !== e.currentTarget.rpassword.value) {
//       setErrorMsg(`The passwords don't match`)
//       return
//     }
//     let res = null
//     let newUserCreated = null
//     useEffect(async () => {
//       newUserCreated = await createUser(body)
//       res = await fetch('/api/signup', {
//         method: 'POST',
//         body: JSON.stringify(body),
//         headers: { 'Content-Type': 'application/json' },
//       })
//     })
//     if (res.status === 200) {
//       console.log("ok")
//       Router.push('/login')
//     }
//     return newUserCreated
//   }

//   return <Layout>
//     <div className="login">
//       <Form isLogin={false} errorMessage={errorMsg} onSubmit={handleSubmit} />
//     </div>
//     <style jsx>{`
//         .login {
//           max-width: 21rem;
//           margin: 0 auto;
//           padding: 1rem;
//           border: 1px solid #ccc;
//           border-radius: 4px;
//         }
//       `}</style>
//   </Layout>

// }

// export default Signup