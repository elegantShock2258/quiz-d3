const UserPage = (props) => {
    if (props.user != -1) {
        return <h1> {props.user.FirstName} {props.user.LastName}'s home page</h1>
    } else {
        return <center>user not found!</center>
    }
}
export default UserPage