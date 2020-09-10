import React, { Component } from 'react';
import axios from "axios";
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Register from './components/Register';

import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: null,
      showSignUpModal: false,
      isLoggedin: false,
      userCreated: false,
      username: "",
      password: "",
      name: "",
      baseURL: "https://divercity-test.herokuapp.com/",
      registerMethod: "register",
      loginMethod: "login",

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


  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar
            handleLoginChange={this.handleLoginChange}
            handleLoginSubmit={this.handleLoginSubmit}
            showSignUpModal={this.showSignUpModal}
            showSignUp={this.state.showSignUp}
            isLoggedin={this.state.isLoggedin}
            username={this.state.username}
            password={this.state.password}
          />
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
              isLoggedin={this.state.isLoggedin}
            />
          </Route>
        </BrowserRouter>
      </>
    )
  }
}
