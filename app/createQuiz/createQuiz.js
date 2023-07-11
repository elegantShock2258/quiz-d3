'use client'
import { createRoot } from 'react-dom/client';
import { getCookie, deleteCookie } from 'cookies-next';
import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { addQuiz, getUser } from '../../lib/user';


function CreateQuestion(props) {
    let questions = props.questions
    let setQuestions = props.setQuestions

    let [options, setOptions] = useState("select question type")
    let [element, setElement] = useState(<></>)

    let [MCQOptions, setMCQOptions] = useState([])
    let thisQuestion = {}


    function cancelCreateQuestion() {
        props.questionDialog.pop()
        props.setQuestionDialog(props.questionDialog)


        let root = createRoot(document.getElementById("insertAddQ"))
        root.render(<div>{props.questionDialog}</div>)
    }

    function saveCreateQuestion(e) {
        console.log("mcq otpions?", MCQOptions)
        let ele = document.getElementById("questionType")
        let QuestionType = (ele.options[ele.options.selectedIndex].value)
        thisQuestion.type = QuestionType

        thisQuestion.text = document.getElementById("questionText").value
        thisQuestion.pos = document.getElementById("posMarks").value
        thisQuestion.neg = document.getElementById("negMarks").value
        thisQuestion.correct = document.getElementById("correct").value

        if (JSON.stringify(MCQOptions) != "[]")
            thisQuestion.options = MCQOptions
        props.questionsJSON.push(thisQuestion)
        props.setQuestionsJSON(props.questionsJSON)

        let thisQuestionUI = []
        thisQuestionUI[0] = <h2>{thisQuestion.text}</h2>
        thisQuestionUI[1] = <p>{thisQuestion.type}</p>
        if (JSON.stringify(thisQuestion.options) != "[]") {
            thisQuestion.options.forEach(element => {
                thisQuestionUI.push(<div><h3>{thisQuestion.options.indexOf(element)}{")"} {element}</h3></div >)
            });
        }

        console.log(thisQuestion, MCQOptions, thisQuestionUI)
        props.questions.push(<div>{thisQuestionUI}<hr /></div>)

        props.setQuestions(props.questions)

        setElement(<></>)
        document.getElementById("questionText").value = ""
        document.getElementById("posMarks").value = ""
        document.getElementById("negMarks").value = ""
        document.getElementById("correct").value = ""
        let ed = document.getElementById("questionType")
        options = (ed.options[0].value)
        setOptions(options)

        MCQOptions = []
        setMCQOptions(MCQOptions)
    }

    function handleOptionChange(e) {
        options = (e.target.options[e.target.options.selectedIndex].value)
        console.log(options)
        if (options === "MSQ") {
            let MCQOptionsUI = []
            let root = null

            function addOption(e) {
                e.preventDefault()

                let optionLabel = document.getElementById('optionInput').value

                MCQOptions.push(optionLabel)
                setMCQOptions(MCQOptions)
                MCQOptionsUI.push(<div> {MCQOptions.length}: {optionLabel}</div>)

                console.log(MCQOptions)
                root = (root == null) ? createRoot(document.getElementById("MCQOptions")) : root

                root.render(<div>{MCQOptionsUI}</div>)
            }

            setElement(<div>
                <h3> MSQ</h3>
                <input id="optionInput" type="text" placeholder='enter option label' />
                <button onClick={addOption}>Add MCQ Option</button>
                <div id="MCQOptions"></div>
            </div>
            )
        } else if (options === "MCQ") {
            let MCQOptionsUI = []
            let root = null

            function addOption(e) {
                e.preventDefault()

                let optionLabel = document.getElementById('optionInput').value

                MCQOptions.push(optionLabel)
                setMCQOptions(MCQOptions)
                MCQOptionsUI.push(<div> {MCQOptions.length}: {optionLabel}</div>)

                console.log(MCQOptions)
                root = (root == null) ? createRoot(document.getElementById("MCQOptions")) : root

                root.render(<div>{MCQOptionsUI}</div>)
            }

            setElement(<div>
                <h3> MCQ</h3>
                <input id="optionInput" type="text" placeholder='enter option label' />
                <button onClick={addOption}>Add MCQ Option</button>
                <div id="MCQOptions"></div>
            </div>
            )

        } else if (options === "FIB") {

        } else if (options === "Matrix") {

        } else if (options === "Subjective") {

        } else if (options === "Numerical") {

        } else if (options === "Integer") {

        }
        setOptions(options)
    }



    return <>
        <h1> Create Question</h1>
        <form>
            <input type="text" id="questionText" placeholder="enter question text here"></input>
            <br />
            <select type="text" name="text" id="questionType" placeholder="select QuestionType" onChange={handleOptionChange} value={options}>
                <option disabled="true">select question type</option>
                <option value="MSQ">MSQ</option>
                <option value="MCQ">MCQ</option>
                <option value="FIB">Fill in the Blanlks</option>
                <option value="Matrix">Matrix Match</option>
                <option value="Subjectuve">Subjectuve</option>
                <option value="Numerical">Numerical</option>
                <option value="Integer">Integer</option>
            </select>
            <br />

            {element}
            <div>
                <input id="posMarks" type="text" placeholder='enter Posiitive marks' />
                <input id="negMarks" type="text" placeholder='enter Negetive marks' />
                <input id="correct" type="text" placeholder='enter correct answer' />
            </div>
        </form>
        <div>
            <button onClick={saveCreateQuestion}>Save</button>
            <button onClick={cancelCreateQuestion}>Cancel</button>
        </div>
    </>






}


const CreateQuiz = async () => {
    // check if cookie exists
    let [questionsJSON, setQuestionsJSON] = useState([])

    let userToken = getCookie('token')
    let [foundUser, setFoundUser] = useState(userToken != null && userToken != undefined)

    let [questionDialog, setQuestionDialog] = useState([])
    let [questionsUI, setQuestionsUI] = useState([])
    // let [r1, setR1] = useState(null)
    // let [r2, setR2] = useState(null)

    let user = null


    if (foundUser && userToken != null) {
        let username = userToken.split(" ")[0].replace("\"", "")
        const res = await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userToken: userToken, remove: false }),
        }).then((data) => {
            return data
        })
        user = await res.json()

        function handleAdd() {
            questionDialog.push(<CreateQuestion questions={questionsUI} setQuestions={(e) => { setQuestionsUI(<>{e}</>); console.log("called?", e) }} questionsJSON={questionsJSON} setQuestionsJSON={setQuestionsJSON} questionDialog={questionDialog} setQuestionDialog={setQuestionDialog} />)
            setQuestionDialog(questionDialog)
            let r2 = createRoot(document.getElementById('insertAddQ'))

            r2.render(<div>{questionDialog}</div>);
            // r1.unmount()
            // r2.unmount()

            console.log(questionDialog)
        }
        async function submitQuestion() {
            let q = {}
            q.id = Math.floor(10234334 * Math.random())
            q.questions = questionsJSON
            q.attempts = []
            console.log(questionsJSON)
            // let r = addQuiz(q, user)

            const res = await fetch('/api/quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: user, create: true, quiz: q }),
            }).then((data) => {
                return data
            })
            let r = await res.json()
        }

        return <div>
            <div>add by pressing the + button, your questions will show here ;{")"}</div>
            <div id='insertQuestion'>{questionsUI}</div>
            <hr />
            <div id='insertAddQ'></div>
            <button onClick={handleAdd}>+</button>
            <button onClick={submitQuestion}>submit quiz</button>
        </div>
    }


}
export default CreateQuiz