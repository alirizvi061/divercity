import React, { Component } from 'react'
import axios from "axios";


class Home extends Component {

    //State for the Job information
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            jobs: [],
            baseURL: "https://divercity-test.herokuapp.com/",
            method: "jobs"
        }
    }

    //Job information is pulled automatically on load and is displayed on screen
    //for this API and APP I'll be using Axios calls instead of fetch because it's cleaner code 
    //and easy to read
    componentDidMount() {
        axios
            .get(this.state.baseURL + this.state.method)
            .then((res) => {
                this.setState({
                    jobs: res.data.jobs,
                    loading: false
                })
                // console.log(this.state.jobs)
            })
            .catch(error => {
                console.log("empty input", error)
            })
    }

    render() {
        return (
            <div>
                <h1>Home Page</h1> {/*This is the area where job information will be displayed */}
                {/* {console.log(this.state.jobs)} */}
                {this.state.jobs.map((job, index) => {
                    console.log(job)
                    return (
                        <div className="jobDescription" key={index}>
                            <p>Title: {job.title}</p>
                            <p>Company: {job.company}</p>
                            <p>Location: {job.location}</p>
                            <p>Description: {job.description}</p>
                        </div>

                    )
                })}
            </div>
        )
    }
}

export default Home;