import React, { Component } from 'react'
import axios from "axios";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            jobs: [],
            baseURL: "https://divercity-test.herokuapp.com/",
            method: "jobs"
        }
    }

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
                <h1>Home Page</h1>
                {/* {console.log(this.state.jobs)} */}
                {this.state.jobs.map((job, index) => {
                    console.log(job)
                    return (
                        <div key={index}>
                            <p>job = {job.id}</p>
                        </div>

                    )
                })}
            </div>
        )
    }
}

export default Home;