import React, { Component } from 'react'
import axios from "axios";


class Home extends Component {

    //State for the incoming Job information
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

    //This function shows the individual job postings
    //it has if else statements that allow for the filtering
    //user can filter using a job's Title, Location, and Skills 
    //this function also renders the apply to job button
    //this button open the job application modal
    renderSearch = (job, index) => {

        const search = this.state.searchTitle;
        const searchLocation = this.state.searchLocation;
        const searchSkills = this.state.searchSkills;

        if (search !== " " && job.title.toLowerCase().indexOf(search.toLowerCase()) === -1) {
            return null
        }

        if (job.location !== undefined) {
            if (searchLocation !== " " && job.location.toLowerCase().indexOf(searchLocation.toLowerCase()) === -1) {
                return null
            }
        }

        if (searchSkills !== " " && job.skills_tag.toString().toLowerCase().indexOf(searchSkills.toLowerCase()) === -1) {
            return null
        }

        return <div className="jobInfo" key={index}>
            <h3>{job.title}</h3>
            <p>Company: {job.company}</p>
            <p>Location: {job.location}</p>
            <p>Description: {job.description}</p>
            <p>Skills:</p>
            <p classname="jobSkills">{job.skills_tag}</p>
            <button className="button" onClick={() => { this.props.showJobModal() }}>APPLY</button>
        </div>
    }

    /*This is the area where job information will be displayed */
    render() {

        return (

            <div className="jobPage">

                <div className="jobHeading">

                    <h1 className="jobH1">Featured Jobs</h1>

                    <h3 className="jobH3">Filter jobs by:</h3>

                    <form className="jobSearchform">

                        <input type="text" name="search" id="searchTitle" placeholder="Title" onChange={this.handleChange} />

                        <input type="text" name="search" id="searchLocation" placeholder="Location" onChange={this.handleChange} />

                        <input type="text" name="search" id="searchSkills" placeholder="Skills" onChange={this.handleChange} />

                    </form>

                </div>

                <div className="jobDescription">
                    {/* This embedded JS calls the renderSearch function with the result from the jobs.map as a parameter  */}
                    {this.state.jobs.map((job, index) => {
                        return this.renderSearch(job, index)
                    })
                    }

                </div>

            </div >
        )
    }
}

export default Home;