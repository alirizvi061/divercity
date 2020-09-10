import React, { Component } from 'react'

export default class Jobmodal extends Component {

    render() {

        return (

            <div className="signupModal modal">
                <div className="modal-content">
                    <span className="close" onClick={() => { this.props.closeJobModal() }}>&times;</span>
                    {
                        this.props.isLoggedin
                            ?
                            <>
                                <h1>Apply</h1>
                                <form onSubmit={(event) => { this.props.handleApplySubmit(event) }}>
                                    <textarea placeholder="Tell us your motivation..." value={this.props.value} id="motivation" onChange={this.props.handleApplyChange}></textarea>
                                    <textarea placeholder="Paste your cover letter here" value={this.props.value} id="cover_letter" onChange={this.props.handleApplyChange}></textarea>
                                    <input type="submit" />
                                </form >
                            </>
                            :
                            <>
                                <h3>Oh no! Seems like you're not logged in! please log in to apply for this job</h3>
                                <form className="loginForm" onSubmit={(event) => { this.props.handleLoginSubmit(event) }}>
                                    <input type="text" value={this.props.username} id="username" placeholder="username" onChange={this.props.handleLoginChange} />
                                    <input type="password" value={this.props.password} id="password" placeholder="password" onChange={this.props.handleLoginChange} />
                                    <input type="submit" value="Log In" />
                                </form>
                            </>
                    }
                </div>
            </div >
        )
    }
}
