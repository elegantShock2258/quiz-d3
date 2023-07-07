import './quizPageStyles.css'

function Question(props) {
    let question = props.question
    console.log(question)

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

    } else if (question.type === 'Subjective') {

    } else if (question.type === 'Numerical') {

    } else if (question.type === 'Integer') {

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