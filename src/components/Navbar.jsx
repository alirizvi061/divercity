import React, { Component } from 'react'

export default class Navbar extends Component {
    //This is the Navbar component
    //This navbar is stuck to the top of the screen
    //and has a turnary operator that check if the user is logged in or not 
    //log in form + sign up button show when user isn't logged in
    //and logout button shows when user is logged 

    render() {
        return (
            <>
                <div className="navbar">

                    <h4 ><a href="/" id="navbarLogo">Divercity</a></h4>

                    {

                        !this.props.isLoggedin ?

                            <div className="loginContainer">

                                <div className="login">

                                    <form className="loginForm" onSubmit={(event) => { this.props.handleLoginSubmit(event) }}>

                                        <input type="text" value={this.props.username} id="username" placeholder="username" onChange={this.props.handleLoginChange} />

                                        <input type="password" value={this.props.password} id="password" placeholder="password" onChange={this.props.handleLoginChange} />

                                        <input className="button" type="submit" value="Log In" />

                                    </form>
                                    {/* the below code shows the error message */}
                                    {this.props.loginErrorMessage}

                                </div>

                                <button className="signUpButton" onClick={() => { this.props.showSignUpModal() }}
                                >Sign up</button>

                            </div >

                            :

                            <button className="signUpButton" onClick={() => { this.props.destroySession() }}>Log Out</button>
                    }

                </div >
            </>
        )
    }
}
