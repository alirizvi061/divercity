import React, { Component } from 'react'


export default class Register extends Component {

    render() {
        return (
            <div className="signupModal modal">
                <div className="modal-content">
                    <span className="close" onClick={() => { this.props.closeSignUpModal() }}>&times;</span>
                    <h1>Sign Up</h1>
                    {this.props.errorMessage}<br />
                    <form onSubmit={(event) => { this.props.handleRegisterSubmit(event) }}>
                        <input type="text" value={this.props.username} id="Rusername" placeholder="Username" onChange={this.props.handleRegisterChange} />
                        <input type="password" value={this.props.password} id="Rpassword" placeholder="Password" onChange={this.props.handleRegisterChange} />
                        <input type="text" value={this.props.name} id="Rname" placeholder="Name" onChange={this.props.handleRegisterChange} />
                        <input className="button" type="submit" />
                    </form >
                </div>
            </div >
        )
    }
}
