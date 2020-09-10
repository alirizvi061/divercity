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
                                    <textarea placeholder="Tell us your motivation..." value={this.props.value} onChange={this.props.handleApplyChange}></textarea>
                                    <textarea placeholder="Paste your cover letter here" value={this.props.value} onChange={this.props.handleApplyChange}></textarea>
                                    <input type="submit" />
                                </form >
                            </>
                            :
                            <p>please <button>log in</button> to apply for this job</p>
                    }
                </div>
            </div >
        )
    }
}
