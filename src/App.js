import React, { Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NavbarComponents from './components/NavbarComponents';
import {Home,Sukses} from './pages'

export default class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <NavbarComponents/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>} exact/>
          <Route path="/sukses" element={<Sukses/>} exact/>
        </Routes>
      </main>
    </BrowserRouter>
    )
  }
}
