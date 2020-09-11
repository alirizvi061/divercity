import React, { Component } from 'react'

export default class Jobmodal extends Component {
    //This component is the Job Application component
    //allows user to submit a job application
    //throws a cautionary error for user to make sure they input 
    //text in both motivation and cover letter fields

    render() {

        return (

            <div className="signupModal modal">

                <div className="modal-content">

                    <span className="close" onClick={() => { this.props.closeJobModal() }}>&times;</span>
                    {
                        this.props.isLoggedin
                            ?
                            <>
                                {/* This is the job application modal */}

                                <h1>Apply</h1>

                                <div className="modalDirection">

                                    <form onSubmit={(event) => { this.props.handleApplySubmit(event) }}>

                                        <textarea className="textbox" placeholder="Tell us your motivation..." value={this.props.value} id="motivation" onChange={this.props.handleApplyChange}></textarea>

                                        <textarea className="textbox" placeholder="Paste your cover letter here" value={this.props.value} id="cover_letter" onChange={this.props.handleApplyChange}></textarea>

                                        {this.props.loginErrorMessage}<br />

                                        <input className="button" type="submit" />

                                    </form >

                                </div>

                            </>

                            :

                            <>
                                {/* This is the modal that allows a user anothe chance to log in */}

                                <h3>Oh no! Seems like you're not logged in! please log in to apply for this job</h3>

                                <form className="loginForm" onSubmit={(event) => { this.props.handleLoginSubmit(event) }}>

                                    <input type="text" value={this.props.username} id="username" placeholder="username" onChange={this.props.handleLoginChange} />

                                    <input type="password" value={this.props.password} id="password" placeholder="password" onChange={this.props.handleLoginChange} /><br />

                                    {this.props.loginErrorMessage}<br />

                                    <input className="button" type="submit" value="Log In" />

                                </form>

                            </>
                    }
                </div>
            </div >
        )
    }
}
