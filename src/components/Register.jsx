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

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <form onSubmit={(event) => { this.props.handleRegisterSubmit(event) }}>
                    <input type="text" id="username" placeholder="Username" onChange={this.props.handleRegisterChange} />
                    <input type="password" id="password" placeholder="Password" onChange={this.props.handleRegisterChange} />
                    <input type="text" id="name" placeholder="Name" onChange={this.props.handleRegisterChange} />
                    <input type="submit" />
                </form >
            </div >
        )
    }
}
