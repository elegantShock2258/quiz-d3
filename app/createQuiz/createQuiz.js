'use client'
import { getCookie, deleteCookie } from 'cookies-next';
import { useState } from 'react';
import ReactDOM from 'react-dom';


function CreateQuestion(props) {
    let questions = props.questions
    let setQuestions = props.setQuestions
    let [options, setOptions] = useState("select question type")
    let [element, setElement] = useState(<></>)
    function cancelCreateQuestion() {
        props.questionDialog.pop()
        props.setQuestionDialog(props.questionDialog)


        ReactDOM.render(<div>{props.questionDialog}</div>, document.querySelector('#insertAddQ'));
    }
    function handleOptionChange(e) {
        options = (e.target.options[e.target.options.selectedIndex].value)
        console.log(options)
        if (options === "MSQ") {
            setElement(<h1> MSQ</h1>)
        } else if (options === "MCQ") {
            setElement(<h1> MCQ</h1>)

        } else if (options === "FIB") {

        } else if (options === "Matrix") {

        } else if (options === "Subjective") {

        } else if (options === "Numerical") {

        } else if (options === "Integer") {

        } 
        setOptions(options)
    }
    function questionSubmit(e) {

    }
    return <>
        <h1> Create Question</h1>
        <form onSubmit={questionSubmit}>
            <input type="text" name="text" placeholder="enter question text here"></input>
            <br />
            <select type="text" name="text" placeholder="select QuestionType"  onChange={handleOptionChange} value={options}>
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
        </form>
        <button onClick={cancelCreateQuestion}>Cancel</button>

    </>






}


const CreateQuiz = async () => {
    // check if cookie exists
    let userToken = getCookie('token')
    let [foundUser, setFoundUser] = useState(userToken != null && userToken != undefined)
    let [questionDialog, setQuestionDialog] = useState([])
    let [questions, setQuestions] = useState([])
    let user = null


    if (foundUser && userToken != null) {
        let username = userToken.split(" ")[0].replace("\"", "")
        const res = await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, remove: false }),
        }).then((data) => {
            return data
        })
        user = await res.json()

        function handleAdd() {
            questionDialog.push(<CreateQuestion questions={questions} setQuestions={setQuestions} questionDialog={questionDialog} setQuestionDialog={setQuestionDialog} />)
            setQuestionDialog(questionDialog)

            ReactDOM.render(<div>{questionDialog}</div>, document.querySelector('#insertAddQ'));
            ReactDOM.render(<div>{questions}</div>, document.querySelector('#insertQuestion'));

            console.log(questionDialog)
        }

        return <div>
            <div>add by pressing the + button</div>
            <div id='insertQuestion'></div>
            <div id='insertAddQ'></div>
            <button onClick={handleAdd}>+</button>
        </div>
    }


}
export default CreateQuiz