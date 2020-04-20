import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Navbar from './Navbar'
import Home from './Home'
import Cart from './Cart'
import Footer from './Footer'
import Login from '../components/forms/Login'
import SignUp from '../components/forms/SignUp'
import UserInfo from '../components/forms/UserInfo.js'
import Receipt from '../components/forms/receipt.js'

// Root page - Home page
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/userInfo" component={UserInfo} />
            <Route path="/Receipt" component={Receipt} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
