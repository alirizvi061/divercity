import React, { Component } from 'react'


export default class Register extends Component {
    //This component is for user registration/signup 

    render() {

        return (

            <div className="signupModal modal">

                <div className="modal-content">

                    <span className="close" onClick={() => { this.props.closeSignUpModal() }}>&times;</span>

                    <h1>Sign Up</h1>
                    {/* This is where the error message pops up */}

                    {this.props.errorMessage}<br />

                    {/* Form for User registration */}

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
