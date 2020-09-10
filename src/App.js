import React, { Component } from 'react';
import axios from "axios";
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Jobmodal from './components/Jobmodal';
import Register from './components/Register';

import './App.css';

export default class App extends Component {

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

  showSignUpModal = () => {
    console.log("modal clicked")
    this.setState({
      showSignUpModal: true
    })
  }

  closeSignUpModal = () => {
    console.log("close modal clicked")
    this.setState({
      showSignUpModal: false
    })
  }

  showJobModal = () => {
    console.log("Job modal clicked")
    this.setState({
      showJobModal: true
    })
  }

  closeJobModal = () => {
    console.log("close Job modal clicked")
    this.setState({
      showJobModal: false
    })
  }

  handleRegisterChange = (event) => {
    this.setState({
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  handleRegisterSubmit = (event) => {
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

  handleLoginChange = (event) => {
    this.setState({
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  handleLoginSubmit = (event) => {
    event.preventDefault();
    axios
      .post(this.state.baseURL + this.state.loginMethod, {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res)
        if (res !== null && res.status === 200) {
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

  handleApplyChange = (event) => {
    this.setState({
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

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
          {/* <Register
            showSignUp={this.state.showSignUp}
            handleRegisterChange={this.handleRegisterChange}
            handleRegisterSubmit={this.handleRegisterSubmit}
            isLoggedin={this.state.isLoggedin}
            username={this.state.username}
            password={this.state.password}
            name={this.state.name}
            baseURL={this.state.baseURL}
            userCreated={this.state.userCreated}
          /> */}
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
