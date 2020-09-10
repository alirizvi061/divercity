import React, { Component } from 'react';
import axios from "axios";
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Jobmodal from './components/Jobmodal';
import Register from './components/Register';
import './App.css';

export default class App extends Component {

  //Most of the state for the app is here.  
  //We're tracking username, passwords, whether or not the user is loggedin... etc.
  //This information will help manipulate the state of the app and
  //and allow us to do some conditional rendering and make API calls
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      showSignUpModal: false,
      showJobModal: false,
      isLoggedin: false,
      userCreated: false,
      username: "",
      password: "",
      name: "",
      baseURL: "https://divercity-test.herokuapp.com/",
      registerMethod: "register",
      loginMethod: "login",
      applyMethod: "jobs/2/apply"
    }
  }
  //Open signup modal
  showSignUpModal = () => {
    console.log("modal clicked")
    this.setState({
      showSignUpModal: true
    })
  }

  //Close signup modal
  closeSignUpModal = () => {
    console.log("close modal clicked")
    this.setState({
      showSignUpModal: false
    })
  }

  //open Jobs modal to apply 
  showJobModal = () => {
    console.log("Job modal clicked")
    this.setState({
      showJobModal: true
    })
  }

  //close the jobs modal
  closeJobModal = () => {
    console.log("close Job modal clicked")
    this.setState({
      showJobModal: false
    })
  }

  //This function handles the changes made to the Signup form
  handleRegisterChange = (event) => {
    this.setState({
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  //This function sends a post requests that user makes using the sign up form
  //when successful this function allows user's information to be entered into the database
  handleRegisterSubmit = (event) => {
    console.log(this.state.baseURL)
    event.preventDefault();
    axios
      .post(this.state.baseURL + this.state.registerMethod, {
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
      })
      .then((res) => {
        console.log(res)
        this.setState({
          username: "",
          password: "",
          name: "",
          isLoggedin: true,
          userCreated: true
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //This function handles changes made to the login form
  handleLoginChange = (event) => {
    this.setState({
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  //This functino handles the submission of the user's login information
  //if this is correct it allows the user to be able to use the 
  //apply to job feature in the app
  //it also saves the jsonwebtoken in the user's local storage
  //so they can stay logged in if the page is refreshed and
  //this token is sent back to the server when applying for jobs
  handleLoginSubmit = (event) => {
    event.preventDefault();
    axios
      .post(this.state.baseURL + this.state.loginMethod, {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          let data = res.data.token
          this.setState({
            token: data,
            isLoggedin: true,
          })
          localStorage.setItem('token', data)
        }
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      username: "",
      password: "",
    });
  }

  //This function handles changes made to the job application form
  handleApplyChange = (event) => {
    this.setState({
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  //This function submits the user's job application
  //it takes the jsonwebtoken back to the server to 
  //authenticate the user
  handleApplySubmit = (event) => {
    event.preventDefault();
    axios
      .post(this.state.baseURL + this.state.applyMethod, {
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
      })
      .then((res) => {
        console.log(res)
        this.setState({
          username: "",
          password: "",
          name: "",
          isLoggedin: true,
          userCreated: true
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //This function is used to clear out 
  //the token from the local storage
  //allowing the user to log out of the app
  destroySession = () => {
    window.localStorage.clear();
    this.setState({
      token: null,
      isLoggedin: false
    })
    console.log(this.state.token)
    console.log(this.state.isLoggedin)
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar
            destroySession={this.destroySession}
            handleLoginChange={this.handleLoginChange}
            handleLoginSubmit={this.handleLoginSubmit}
            showSignUpModal={this.showSignUpModal}
            showSignUp={this.state.showSignUp}
            isLoggedin={this.state.isLoggedin}
            username={this.state.username}
            password={this.state.password}
          />
          {
            this.state.showJobModal
              ? <Jobmodal
                handleApplyChange={this.handleApplyChange}
                handleApplySubmit={this.handleApplySubmit}
                closeJobModal={this.closeJobModal}
                isLoggedin={this.state.isLoggedin}
                handleLoginChange={this.handleLoginChange}
                handleLoginSubmit={this.handleLoginSubmit}
                showSignUpModal={this.showSignUpModal}
                showSignUp={this.state.showSignUp}
                username={this.state.username}
                password={this.state.password}
              /> : null
          }
          {
            this.state.showSignUpModal
              ? <Register
                handleRegisterChange={this.handleRegisterChange}
                handleRegisterSubmit={this.handleRegisterSubmit}
                isLoggedin={this.state.isLoggedin}
                username={this.state.username}
                password={this.state.password}
                name={this.state.name}
                baseURL={this.state.baseURL}
                userCreated={this.state.userCreated}
                closeSignUpModal={this.closeSignUpModal}
              /> : null
          }
          <Route
            path="/" >
            <Home
              closeJobModal={this.closeJobModal}
              showJobModal={this.showJobModal}
              isLoggedin={this.state.isLoggedin}
            />
          </Route>
        </BrowserRouter>
      </>
    )
  }
}
