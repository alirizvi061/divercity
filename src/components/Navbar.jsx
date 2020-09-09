import React, { Component } from 'react'

export default class Navbar extends Component {

    render() {
        return (
            <div className="navbar">
                <h4>Divercity</h4>
                <div className="loginContainer">
                    <form className="loginForm">
                        <input type="text" placeholder="username" />
                        <input type="text" placeholder="password" />
                        <input type="submit" value="Log In" />
                    </form>
                    <p>not a user? <a href=" ">Sign up</a></p>
                </div>
            </div>
        )
    }
}
