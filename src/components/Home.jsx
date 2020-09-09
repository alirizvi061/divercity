import React, { Component } from 'react'
import axios from "axios";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            baseURL: "https://divercity-test.herokuapp.com/",
            method: "jobs"
        }
    }

    componentDidMount() {
        axios
            .get(this.state.baseURL + this.state.method)
            .then((res) => {
                console.log(res)
            })
            .catch(error => {
                console.log("empty input", error)
            })
    }

    render() {
        return (
            <div>
                <h1>Home Page</h1>
                <div>
                    {this.state.loading ? <div>loading...</div> : <div>person...</div>}
                </div>
            </div>
        )
    }
}

export default Home;