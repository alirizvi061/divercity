//These are all the essential imports for this app
import React, { Component } from 'react';
import axios from "axios";
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Jobmodal from './components/Jobmodal';
import Register from './components/Register';
import Footer from './components/Footer';
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
      Rusername: "", //Created a second set of states for Registration
      password: "",
      Rpassword: "", //was creating a bug for Login 
      Rname: "",
      motivation: "",
      cover_letter: "",
      errorMessage: "",
      loginErrorMessage: "",
      applyErrorMessage: "",
      baseURL: "https://divercity-test.herokuapp.com/",
      registerMethod: "register",
      loginMethod: "login",
      applyMethod: "jobs/2/apply"
    }
  }


  //Open signup modal
  showSignUpModal = () => {
    this.setState({
      showSignUpModal: true,
      loginErrorMessage: ""
    })
  }

  //Close signup modal
  closeSignUpModal = () => {
    this.setState({
      showSignUpModal: false,
      errorMessage: "",
      loginErrorMessage: ""
    })
  }

  //open Jobs modal to apply 
  showJobModal = () => {
    this.setState({
      showJobModal: true,
      loginErrorMessage: ""
    })
  }

  //close the jobs modal
  closeJobModal = () => {
    this.setState({
      showJobModal: false,
      loginErrorMessage: ""
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
    event.preventDefault();
    if (this.state.Rusername !== "" && this.state.Rpassword !== "" && this.state.Rname !== "") {
      axios
        .post(this.state.baseURL + this.state.registerMethod, {
          username: this.state.Rusername,
          password: this.state.Rpassword,
          name: this.state.Rname,
        })
        .then((res) => {
          this.setState({
            Rusername: "",
            Rpassword: "",
            Rname: "",
            isLoggedin: true,
            userCreated: true,
            showSignUpModal: false,
            errorMessage: "",
          });
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      this.setState({
        errorMessage: "Please complete all fields before signing up!"
      })
    }
  };


  //This function handles changes made to the login form
  handleLoginChange = (event) => {
    this.setState({
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  //This function handles the submission of the user's login information
  //if this is correct it allows the user to be able to use the 
  //apply to job feature in the app
  //it also saves the jsonwebtoken in the user's local storage
  //so they can stay logged in if the page is refreshed and
  //this token is sent back to the server when applying for jobs
  handleLoginSubmit = (event) => {
    event.preventDefault();
    if (this.state.username !== "" && this.state.password !== "") {
      axios
        .post(this.state.baseURL + this.state.loginMethod, {
          username: this.state.username,
          password: this.state.password,
        })
        .then((res) => {
          if (res.status === 200) {
            let data = res.data.token
            this.setState({
              token: data,
              isLoggedin: true,
              loginErrorMessage: "",
            })
            localStorage.setItem('token', data)
            localStorage.setItem('username', data)
          }
        })
        .catch((err) => {
          alert(err);
        });
      this.setState({
        username: "",
        password: "",
        loginErrorMessage: "",
      });
    } else {
      this.setState({
        loginErrorMessage: "Username/Password empty!"
      })
    }
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({
        isLoggedin: true,
        token: localStorage.getItem('token')
      })
    }
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
    if (this.state.motivation !== "" && this.state.cover_letter !== "") {
      axios
        .post(this.state.baseURL + this.state.applyMethod, {
          motivation: this.state.motivation,
          cover_letter: this.state.cover_letter,
        }, {
          headers: {
            'Authorization': `${localStorage.getItem('token')}`
          }
        })
        .then((res) => {
          this.setState({
            showJobModal: false,
            applyErrorMessage: ""

          })
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      this.setState({
        applyErrorMessage: "Please input text in both fields to continue!"
      })
    }
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
            showJobModal={this.state.showJobModal}
            showSignUp={this.state.showSignUp}
            isLoggedin={this.state.isLoggedin}
            username={this.state.username}
            password={this.state.password}
            loginErrorMessage={this.state.loginErrorMessage}
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
                motivation={this.state.motivation}
                cover_letter={this.state.cover_letter}
                loginErrorMessage={this.state.loginErrorMessage}
                applyErrorMessage={this.state.applyErrorMessage}
              /> : null
          }
          {
            this.state.showSignUpModal
              ? <Register
                handleRegisterChange={this.handleRegisterChange}
                handleRegisterSubmit={this.handleRegisterSubmit}
                isLoggedin={this.state.isLoggedin}
                Rusername={this.state.Rusername}
                Rpassword={this.state.Rpassword}
                Rname={this.state.Rname}
                baseURL={this.state.baseURL}
                userCreated={this.state.userCreated}
                closeSignUpModal={this.closeSignUpModal}
                errorMessage={this.state.errorMessage}
              /> : null
          }
          <Route
            path="/" >
            <Home
              closeJobModal={this.closeJobModal}
              showJobModal={this.showJobModal}
              isLoggedin={this.state.isLoggedin}
            />
            <Footer />
          </Route>
        </BrowserRouter>
      </>
    )
  }
}
