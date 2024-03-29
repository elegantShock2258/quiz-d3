'use client'
import { useRef, useState } from 'react'
import './styles.css'
import ReactImagePickerEditor, { ImagePickerConf } from 'react-image-picker-editor';
// import 'react-image-picker-editor/dist/index.css'

const config2 = {
    borderRadius: '8px',
    language: 'en',
    width: '330px',
    height: '250px',
    objectFit: 'contain',
    compressInitial: null,
};
const initialImage = ''; //default pfp img


// for UI:
// make a central layout where it asks your:
// 1) Fname,Lastname
// 2) username, password
// 3) pfp
// 4) ppl to follow (like insta)
// 5) quiz to attempt (make it like 4)
// 6) topics to make quiz in 

//TODO: add back button
// TODO : dont let register for existing username, check ifpass are same
export default function Signup() {

    let [Lname, setLname] = useState(""),
        [Fname, setFname] = useState(""),
        [username, setUsername] = useState(""),
        [password, setPassword] = useState(""),
        pfp = initialImage;

    const [counter, setCounter] = useState(3)
    const [errorMsg, setErrorMsg] = useState('')
    function handleSubmitNames(e) {
        setFname(e.currentTarget["0"].value)
        setLname(e.currentTarget["1"].value)

        console.log(Fname, Lname)
        setCounter(1)
    }
    function AskNames() {
        return <>
            <div className='AskNames'>
                <div className='container'>
                    <form onSubmit={handleSubmitNames}>
                        <h1>Let us know you</h1>
                        <div className='inputs'>
                            <div className='fnameInput'>
                                <input name="fname" type="text" placeholder='Enter Your First Name' required></input>
                            </div>
                            <div className='lnameInput'>
                                <input name="lname" type="text" placeholder='Enter Your Last Name' required></input>
                            </div>
                        </div>
                        <button className='loginBtn' type="submit">Next</button>
                    </form>
                </div>
            </div>
        </>
    }
    function handleSubmitCreds(e) {
        let lpassword = e.currentTarget["1"].value
        let lrpassword = e.currentTarget["2"].value

        if (lpassword == lrpassword) {
            setPassword(e.currentTarget["1"].value)
            setUsername(e.currentTarget["0"].value)
            setCounter(2)
        } else {
            //pass wont match
            console.log("Passwords dont match")
        }
    }
    function AskCredentials() {
        return <div className='AskCredentials'>
            <div className='container'>
                <form onSubmit={handleSubmitCreds}>
                    <h1>Identify Yourself</h1>
                    <div className='inputs'>
                        <div className='usernameInput'>
                            <input name="username" type="text" placeholder='Enter Your Username' required></input>
                        </div>

                        <div className='passwordInput'>
                            <input name="password" type="password" placeholder='Enter Your Password' required></input>
                        </div>

                        <div className='passwordInput'>
                            <input name="rpassword" type="password" placeholder='Re-Enter Your Password' required></input>
                        </div>

                    </div>
                    <button className='loginBtn' type="submit">Next</button>
                </form>
            </div>
        </div>
    }


    function AskPfp() {

        let [pfpThere, setPfpThere] = useState("Skip")
        function setImageSrc(newDataUri) {
            pfp = (newDataUri == null) ? newDataUri : initialImage
            if (pfp != initialImage) setPfpThere("Next")
            else setPfpThere("Skip")
        }
        function submitPfp(e) {
            handleSubmit()
            setCounter(3)
        }

        return <div className='AskPfp'>
            <div className='container'>
                <ReactImagePickerEditor
                    config={config2}
                    imageSrcProp={initialImage}
                    imageChanged={(newDataUri) => { setImageSrc(newDataUri) }} />

                <button className='loginBtn' onClick={submitPfp}>{pfpThere}</button>
            </div>
        </div>
    }
    
    async function handleSubmit(e) {
        if (errorMsg) setErrorMsg('')
        pfp = pfp == null ? "" : pfp
        const body = {
            Fname: Fname,
            Lname: Lname,
            Username: username,
            Password: password,
            pfp: pfp
        }
        let res = null
        res = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        if (res.status === 200) {
            console.log("ok")
            Router.push("/login")
        }
    }

    if (counter == 0) {
        return <>
            <AskNames />
        </>
    } else if (counter == 1) {
        return <>
            <AskCredentials />
        </>
    } else if (counter == 2) {
        return <>
            <AskPfp />
        </>
    }
    // TODO: Implement!
    // else if (counter == 3) {
    //     return <>
    //         <AskToFollow />
    //     </>
    // } else if (counter == 4) {
    //     return <>
    //         <AskQuizToAttempt />
    //     </>
    // } else if (counter == 5) {
    //     return <>
    //         <ShowRandomQuizTopic />
    //     </>
    // }

}