import './quizPageStyles.css'

function Question(props) {
    let question = props.question
    console.log(question)

    let questionText = question.text
    //FIB,MCQ,MSQ,Matrix,Subjective,Numerical,Integer
    if (question.type === 'FIB') {
        let finder = "😊"
        let textBefore = question.text.slice(finder, question.text.indexOf(finder))
        let textAfter = question.text.slice(question.text.indexOf(finder) + 2)// unicode bs should have selected a better finder

        return <div className="FIBContainer">
            <div>
                {textBefore}
                <input type="text" className="FIBBlank"></input>
                {textAfter}
            </div>
        </div>
    } else if (question.type === 'MSQ') {
        let questionText = question.text

        let options = [], noOptions = <div> omg no options</div>

        for (let i = 0; i < question.options.length; i++) {
            options[i] = <div><input className='MSQCheckbox' type="checkbox" /> {question.options[i]} </div>
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

    } else if (question.type === 'MCQ') {
        let questionText = question.text

        let options = [], noOptions = <div> omg no options</div>

        for (let i = 0; i < question.options.length; i++) {
            options[i] = <div><input className='MSQCheckbox' type="radio" /> {question.options[i]} </div>
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
    } else if (question.type === 'Matrix') {
        let numRow = question.cols[0].length
        let table = []

        for (let i = 0; i < question.cols.length; i++) {
            let tableRow = []
            for (let j = 0; j < numRow; j++) {
                tableRow.push(<td>{question.cols[i][j]}</td>)
            }
            table.push(<tr>{tableRow.length ? tableRow : <div>empty</div>}</tr>)
        }

        return <div className='MatrixContainer'>
            <div className='MatrixContainerText'>{questionText}</div>
            <div className='MatrixTableContainer'>
                <table>
                    {table.length ? table : null}
                </table>
            </div>
        </div>
    } else if (question.type === 'Subjective') {
        return <div className='SubjectiveContainer'>
            <div className='SubjectiveContainerText'>{"" + questionText}</div>
            <div className='SubjectiveContainerInput'>
                <input type='text' className='subjectiveInput' ></input>
            </div>
        </div>
    } else if (question.type === 'Numerical') {
        return <div className='NumericalContainer'>
            <div className='NumericalContainerText'>{"" + questionText}</div>
            <div className='SubjectiveContainerInput'>
                <input readOnly='true' type='number' className='subjectiveInput' ></input>
                <table>
                    <tr>
                        <td><button className='numericalButton'>1</button></td>
                        <td><button className='numericalButton'>2</button></td>
                        <td><button className='numericalButton'>3</button></td>
                    </tr>
                    <tr>
                        <td><button className='numericalButton'>4</button></td>
                        <td><button className='numericalButton'>5</button></td>
                        <td><button className='numericalButton'>6</button></td>
                    </tr>
                    <tr>
                        <td><button className='numericalButton'>7</button></td>
                        <td><button className='numericalButton'>8</button></td>
                        <td><button className='numericalButton'>9</button></td>
                    </tr>
                    <tr>
                        <td><button className='numericalButton'>0</button></td>
                        <td><button className='numericalButton'>.</button></td>
                        <td><button className='numericalButton'>c</button></td>
                    </tr>
                </table>
            </div>
        </div>
    } else if (question.type === 'Integer') {
        return <div className='IntegerContainer'>
            <div className='IntegerContainerText'>{questionText}</div>
            <div className='SubjectiveContainerInput'>
                <input readOnly='true' type='number' className='subjectiveInput' ></input>
                <table>
                    <tr>
                        <td><button className='numericalButton'>1</button></td>
                        <td><button className='numericalButton'>2</button></td>
                        <td><button className='numericalButton'>3</button></td>
                    </tr>
                    <tr>
                        <td><button className='numericalButton'>4</button></td>
                        <td><button className='numericalButton'>5</button></td>
                        <td><button className='numericalButton'>6</button></td>
                    </tr>
                    <tr>
                        <td><button className='numericalButton'>7</button></td>
                        <td><button className='numericalButton'>8</button></td>
                        <td><button className='numericalButton'>9</button></td>
                    </tr>
                    <tr>
                        <td><button className='numericalButton'>0</button></td>
                        <td colSpan={2}><button className='numericalButton'>clear</button></td>
                    </tr>
                </table>
            </div>
        </div >
    }

    return <>
        <div className="questionText">{question.text}</div>

    </>
}


const QuizPage = (props) => {
    let content = []
    let answers = []
    if (props.quiz != -1) {
        let quiz = props.quiz
        let questions = quiz.questions

        questions.forEach(element => {
            content.push(<Question question={element} answers={answers}></Question>)
        });

    } else {
        content.push(<center> quiz not found!</center>)
    }
    return (<div className="quizParent">
        {content.length ? content : loading}
    </div>)
}
// on input interacion put a class "interacted" to it, to indicate it interacted, if question is MSQ or any other, remove "interacted" if unselected 
//while submision do document.querySelector("input[class="interacted"]") and the array of inputs (with valid values) is the list of answers

export default QuizPage