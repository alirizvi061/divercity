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
      isLoggedin: false,
      username: "",
      password: "",
      name: "",
      baseURL: "https://divercity-test.herokuapp.com/register",
      userCreated: false
    }
  }

  handleRegisterChange = (event) => {
    this.setState({
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  handleRegisterSubmit = (event) => {
    event.preventDefault();
    axios
      .post(this.state.baseURL, {
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
          userCreated: true
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <Register
            handleRegisterChange={this.handleRegisterChange}
            handleRegisterSubmit={this.handleRegisterSubmit}
            isLoggedin={this.state.isLoggedin}
            username={this.state.username}
            password={this.state.password}
            name={this.state.name}
            baseURL={this.state.baseURL}
          />
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
