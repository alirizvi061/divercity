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
            searchTitle: "",
            searchLocation: "",
            searchSkills: ""

        }
    }

    //Job information is pulled automatically on load and is displayed on screen
    //for this API and APP I'll be using Axios calls instead of fetch because it's cleaner code 
    //and easy to read
    async componentDidMount() {
        const call = await axios
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
        return call;
    }

    //This handleChange function is there to let the user manipulate the state of "Search"
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });

    }

    renderSearch = (job, index) => {
        const search = this.state.searchTitle;
        const searchLocation = this.state.searchLocation;
        const searchSkills = this.state.searchSkills;

        if (search !== " " && job.title.toLowerCase().indexOf(search.toLowerCase()) === -1) {
            console.log(job.location)
            return null
        }

        if (job.location !== undefined) {
            if (searchLocation !== " " && job.location.toLowerCase().indexOf(searchLocation.toLowerCase()) === -1) {
                return null
            }
        }

        if (searchSkills !== " " && job.skills_tag.toString().toLowerCase().indexOf(searchSkills.toLowerCase()) === -1) {
            console.log(job.skills_tag)
            return null
        }

        return <div className="job" key={index}>
            <p>Title: {job.title}</p>
            <p>Company: {job.company}</p>
            <p>Location: {job.location}</p>
            <p>Description: {job.description}</p>
            <p>Skills: {job.skills_tag}</p>
            <button onClick={() => { this.props.showJobModal() }}>APPLY</button>
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
                    <input type="text" name="search" id="searchTitle" placeholder="Title" onChange={this.handleChange} />
                    <input type="text" name="search" id="searchLocation" placeholder="Location" onChange={this.handleChange} />
                    <input type="text" name="search" id="searchSkills" placeholder="Skills" onChange={this.handleChange} />
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