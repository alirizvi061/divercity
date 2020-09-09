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
            method: "jobs",
            search: ""
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

    //This handleChange function is there to let the user manipulate the state of "Search"
    handleChange = (event) => {
        this.setState({ search: event.target.value });

    }

    renderSearch = (job, index) => {
        const search = this.state.search;

        if (search !== " " && job.title.toLowerCase().indexOf(search.toLowerCase()) === -1) {
            return null
        }

        return <div className="job" key={index}>
            <p>Title: {job.title}</p>
            <p>Company: {job.company}</p>
            <p>Location: {job.location}</p>
            <p>Description: {job.description}</p>
            <p>Skills: {job.skills_tag}</p>
        </div>
    }

    render() {
        return (
            <div>
                <h1>Job Listing</h1> {/*This is the area where job information will be displayed */}
                <form className="form">
                    {/* <label for="key">Choose search type:</label>
                    <select name="key" id="cars">
                        <option value="title">Title</option>
                        <option value="location">Location</option>
                        <option value="skills">Skills</option> */}
                    {/* </select> */}
                    <input type="text" name="search" placeholder="location, job type, skills..." onChange={this.handleChange} />
                    {/* <input type="text" placeholder="Job Type" />
                    <input type="text" placeholder="Skills" /> */}
                    {/* <input type="submit" /> */}
                </form>
                <div className="jobDescription">
                    {this.state.jobs.map((job, index) => {
                        return this.renderSearch(job, index) /* This embedded JS calls the renderSearch function with the result from the jobs.map as a parameter */
                    })
                    }
                </div>
            </div >
        )
    }
}

export default Home;