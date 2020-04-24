import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Navbar from './Navbar'
import Home from './Home'
import Cart from './Cart'
import Footer from './Footer'
import Login from '../components/forms/Login'
import Product from './Product'
import SignUp from '../components/forms/SignUp'
import UserInfo from '../components/forms/UserInfo.js'
import DeliveryForm from '../components/forms/DeliveryForm.js'
import Receipt from '../components/forms/receipt.js'
import ProductReview from '../components/forms/review.js'
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
            <Route path="/delivery" component={DeliveryForm} />
            <Route path="/Receipt" component={Receipt} />
            <Route path="/ProductReview" component={ProductReview} />
            <Route path="/product" component={Product} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
