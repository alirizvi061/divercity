import React, { Component } from 'react'

export default class Navbar extends Component {


    render() {
        return (
            <div className="navbar">
                <h4>Divercity</h4>
                <div className="loginContainer">
                    <form className="loginForm" onSubmit={(event) => { this.props.handleLoginSubmit(event) }}>
                        <input type="text" id="username" placeholder="username" onChange={this.props.handleLoginChange} />
                        <input type="password" id="password" placeholder="password" onChange={this.props.handleLoginChange} />
                        <input type="submit" value="Log In" />
                    </form>
                    <p>not a user? </p>
                    <button onClick={() => { this.props.showSignUpModal() }}
                    >Sign up</button>
                </div >
            </div >
        )
    }
}
