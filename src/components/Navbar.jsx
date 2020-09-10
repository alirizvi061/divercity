import React, { Component } from 'react'

export default class Navbar extends Component {


    render() {
        return (
            <>
                <div className="navbar">
                    <h4>Divercity</h4>
                    {
                        !this.props.isLoggedin ?
                            <div className="loginContainer">
                                <form className="loginForm" onSubmit={(event) => { this.props.handleLoginSubmit(event) }}>
                                    <input type="text" value={this.props.username} id="username" placeholder="username" onChange={this.props.handleLoginChange} />
                                    <input type="password" value={this.props.password} id="password" placeholder="password" onChange={this.props.handleLoginChange} />
                                    <input type="submit" value="Log In" />
                                </form>
                                <p>not a user? </p>
                                <button onClick={() => { this.props.showSignUpModal() }}
                                >Sign up</button>
                            </div > : <button onClick={() => { this.props.destroySession() }}>Log Out</button>
                    }
                </div >
            </>
        )
    }
}
