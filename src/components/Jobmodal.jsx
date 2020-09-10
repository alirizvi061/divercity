import React, { Component } from 'react'

export default class Jobmodal extends Component {
    render() {
        return (
            <div className="signupModal modal">
                <div className="modal-content">
                    <span className="close" onClick={() => { this.props.closeJobModal() }}>&times;</span>
                    <h1>Apply</h1>
                    <form onSubmit={(event) => { this.props.handleApplySubmit(event) }}>
                        <textarea value={this.props.value} onChange={this.props.handleApplyChange}></textarea>
                        <input type="text" value={this.props.username} id="username" placeholder="Username" onChange={this.props.handleApplyChange} />
                        <input type="password" value={this.props.password} id="password" placeholder="Password" onChange={this.props.handleApplyChange} />
                        <input type="text" value={this.props.name} id="name" placeholder="Name" onChange={this.props.handleApplyChange} />
                        <input type="submit" />
                    </form >
                </div>
            </div >
        )
    }
}
