import React, { Component } from 'react'

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    showLoginModal = () => {
        this.setState({
            show: true
        })
    }

    closeLoginModal = () => {
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <div>
                <h1>Log In</h1>
            </div>
        )
    }
}
