import React, { Component } from 'react'


export default class Register extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         username: "",
    //         password: "",
    //         name: "",
    //         baseURL: "https://divercity-test.herokuapp.com/register",
    //         userCreated: false
    //     }
    // }

    // handleRegisterChange = (event) => {
    //     this.setState({
    //         [event.currentTarget.id]: event.currentTarget.value
    //     })
    // }

    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     axios
    //         .post(this.state.baseURL, {
    //             username: this.state.username,
    //             password: this.state.password,
    //             name: this.state.name,
    //         })
    //         .then((res) => {
    //             console.log(res)
    //             this.setState({
    //                 username: "",
    //                 password: "",
    //                 name: "",
    //                 userCreated: true
    //             });
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };
    //     <!-- The Modal -->
    // <div id="myModal" class="modal">

    //   <!-- Modal content -->
    //   <div class="modal-content">
    //     <span class="close">&times;</span>
    //     <p>Some text in the Modal..</p>
    //   </div>

    // </div>

    render() {
        return (
            <div className="signupModal">
                {/* <div className="modal-content"> */}
                <span className="close" onClick={() => { this.props.closeSignUpModal() }}>&times;</span>
                <h1>Sign Up</h1>
                <form onSubmit={(event) => { this.props.handleRegisterSubmit(event) }}>
                    <input type="text" value={this.props.username} id="username" placeholder="Username" onChange={this.props.handleRegisterChange} />
                    <input type="password" value={this.props.password} id="password" placeholder="Password" onChange={this.props.handleRegisterChange} />
                    <input type="text" value={this.props.name} id="name" placeholder="Name" onChange={this.props.handleRegisterChange} />
                    <input type="submit" />
                </form >
                {/* </div> */}
            </div >
        )
    }
}
