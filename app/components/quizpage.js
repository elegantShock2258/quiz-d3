'use client'
import { useRef, useState } from 'react'
import './quizPageStyles.css'

function Question(props) {
    let question = props.question
    console.log(question)

    let questionText = question.text
    //FIB,MCQ,MSQ,Matrix,Subjective,Numerical,Integer
    if (question.type === 'FIB') {
        // add character limit
        // add stuff like only enter one word or only 2 words etc
        // add stuff  like you can only enter a string which is compatible with a regex expression


        // UI/UX:
        //make it transparent, make it change bg when answer is given
        // make it have red bg if incompatible answers
        // make it white with alpha if it is compatible.

        let finder = "😊"
        let textBefore = question.text.slice(finder, question.text.indexOf(finder))
        let textAfter = question.text.slice(question.text.indexOf(finder) + 2)// unicode bs should have selected a better finder

        return <div className="FIBContainer">
            <div>
                {textBefore}
                <input type="text" id={"answer" + props.id} className="FIBBlank"></input>
                {textAfter}
            </div>
        </div>
    }
    else if (question.type === 'MSQ') {
        let questionText = question.text

        let [ref, setRef] = useState([]);

        let options = [], noOptions = <div> omg no options</div> //should never come

        function updateAnswerId(answerId, e) {
            if (`${ref}` === []) {
                ref.pop()
                setRef(ref)
            }
            if (e.target.checked) {
                ref.push(answerId)
                setRef(ref)
            }
            else {
                ref.splice(ref.indexOf(answerId), 1)
                setRef(ref)
            }
            document.getElementById("answer" + props.id).innerText = JSON.stringify(ref)
        }

        for (let i = 0; i < question.options.length; i++) {
            options[i] = <div><input className='MSQCheckbox' type="checkbox" onChange={(e) => { updateAnswerId(question.options[i], e) }} /> {question.options[i]} </div>
        }
        return <div className='MSQContainer'>
            <div className='MSQQuestionText'>{questionText}</div>
            <div className='Form'>
                <div className='optionsContainer'>
                    {options.length ? options : noOptions}
                </div>
                <div className="answerValue MSQ" id={"answer" + props.id}></div>
            </div>
        </div>

    }
    else if (question.type === 'MCQ') {
        let questionText = question.text

        let options = [], noOptions = <div> omg no options</div>

        let [checked, setChecked] = useState(-1)

        for (let i = 0; i < question.options.length; i++) {
            options[i] = <div><input className='MSQCheckbox' id={(checked == i) ? "answer" + props.id : ""} type="radio" checked={checked === i} onChange={(e) => { setChecked(i); }} value={question.options[i]} /> {question.options[i]} </div>

        }
        return <div className='MSQContainer'>
            <div className='MSQQuestionText'>{questionText}</div>
            <div className='Form'>
                <form>
                    <div className='optionsContainer'>
                        {options.length ? options : noOptions}
                    </div>
                </form>
            </div>
        </div>
    }
    else if (question.type === 'Matrix') {
        let numRow = question.cols[0].length
        let table = []

        let [ref, setRef] = useState(["this shouldnt appear as an anwer"]);

        let options = [], noOptions = <div> omg no options</div> //should never come

        function updateAnswerId(answerId, e) {
            if (`${ref}` === []) {
                ref.pop()
                setRef(ref)
            }
            if (e.target.checked) {
                ref.push(answerId)
                setRef(ref)
            }
            else {
                ref.splice(ref.indexOf(answerId), 1)
                setRef(ref)
            }
            document.getElementById("answer" + props.id).innerText = JSON.stringify(ref)
        }

        for (let i = 0; i < question.cols.length; i++) {
            let tableRow = []
            for (let j = 0; j < numRow; j++) {
                tableRow.push(<td key={j}>{question.cols[i][j]}</td>)
            }
            table.push(<tr key={i}>{tableRow.length ? tableRow : <div>empty</div>}</tr>)
        }


        for (let i = 0; i < question.options.length; i++) {
            options[i] = <div><input className='MSQCheckbox' type="checkbox" key={i} onChange={(e) => { updateAnswerId(question.options[i], e) }} /> {question.options[i]} </div>
        }


        return <div className='MatrixContainer'>
            <div className='MatrixContainerText'>{questionText}</div>
            <div className='MatrixTableContainer'>
                <table>
                    <tbody>
                        {table.length ? table : null}
                    </tbody>
                </table>
                <div className='optionsContainer'>
                    {options.length ? options : noOptions}
                </div>
                <div className="answerValue MSQ" id={"answer" + props.id}></div>
            </div>
        </div>
    }
    else if (question.type === 'Subjective') {
        return <div className='SubjectiveContainer'>
            <div className='SubjectiveContainerText'>{"" + questionText}</div>
            <div className='SubjectiveContainerInput'>
                <input type='text' id={"answer" + props.id} className='subjectiveInput' ></input>
            </div>
        </div>
    } else if (question.type === 'Numerical') {
        let [answerText, setAnswer] = useState("")
        function setAnswerText(t) {
            if (t != "C")
                setAnswer(`${answerText}${t}`)
            else
                setAnswer("")
        }
        return <div className='NumericalContainer'>
            <div className='NumericalContainerText'>{"" + questionText}</div>
            <div className='SubjectiveContainerInput'>
                <input readOnly={true} id={"answer" + props.id} type='text' value={answerText} className='subjectiveInput' ></input>
                <table>
                    <tbody>
                        <tr>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>1</button></td>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>2</button></td>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>3</button></td>
                        </tr>
                        <tr>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>4</button></td>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>5</button></td>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>6</button></td>
                        </tr>
                        <tr>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>7</button></td>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>8</button></td>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>9</button></td>
                        </tr>
                        <tr>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>0</button></td>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>.</button></td>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>C</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div >
    } else if (question.type === 'Integer') {
        let [answerText, setAnswer] = useState("")
        function setAnswerText(t) {
            if (t != "C")
                setAnswer(`${answerText}${t}`)
            else
                setAnswer("")
        }
        return <div className='IntegerContainer'>
            <div className='IntegerContainerText'>{questionText}</div>
            <div className='SubjectiveContainerInput'>
                <input readOnly={true} id={"answer" + props.id} type='text' value={answerText} className='subjectiveInput' ></input>
                <table>
                    <tbody>
                        <tr>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>1</button></td>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>2</button></td>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>3</button></td>
                        </tr>
                        <tr>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>4</button></td>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>5</button></td>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>6</button></td>
                        </tr>
                        <tr>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>7</button></td>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>8</button></td>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>9</button></td>
                        </tr>
                        <tr>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>0</button></td>
                            <td><button className='numericalButton' onClick={(e) => { setAnswerText(e.target.innerText) }}>C</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    }

    return <>
        <div className="questionText">{question.text}</div>
    </>
}


const QuizPage = (props) => {
    function submitAnswers() {
        let answers = [...document.querySelectorAll('[id^="answer"]')].map(e => {
            if (e.classList.contains('MSQ')) {
                if (e.innerText != "")
                    return JSON.parse(e.innerText)
                else 
                    return ""
            } else {
                return e.value
            }
        });
        console.log(answers)
    }
    let content = []
    let answers = []
    if (props.quiz != -1) {
        let quiz = props.quiz
        let questions = quiz.questions

        questions.forEach(element => {
            content.push(<Question question={element} id={questions.indexOf(element)} answers={answers}></Question>)
        });

    } else {
        content.push(<center> quiz not found!</center>)
    }
    return (<div className="quizParent">
        {content.length ? content : loading}
        <button onClick={submitAnswers}>submit</button>
    </div>)
}
// on input interacion put a class "interacted" to it, to indicate it interacted, if question is MSQ or any other, remove "interacted" if unselected 
//while submision do document.querySelector("input[class="interacted"]") and the array of inputs (with valid values) is the list of answers

export default QuizPage