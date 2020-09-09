import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Route
          path="/" >
          <Home />
        </Route>
      </BrowserRouter>
    </>
  );
}

export default App;
