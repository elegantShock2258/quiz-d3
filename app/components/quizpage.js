const QuizPage = (props) => {
    if (props.quiz != -1) {
        return <h1> {props.quiz.id} Quiz!</h1>
    } else {
        return <center>quiz not found!</center>
    }
}

export default QuizPage