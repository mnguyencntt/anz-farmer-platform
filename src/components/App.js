import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Navbar from './Navbar'
import Home from './Home'
import Cart from './Cart'
import Footer from './Footer'
import Login from '../components/forms/Login'
import Product from './Product'
import ProductManagement from './ProductManagement'
import SignUp from '../components/forms/SignUp'
import UserInfo from '../components/forms/UserInfo.js'
import DeliveryForm from '../components/forms/DeliveryForm.js'
import PaymentForm from '../components/forms/PaymentForm.js'
import Receipt from '../components/forms/receipt.js'

// Root page - Home page
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/userInfo" component={UserInfo} />
            <Route path="/delivery" component={DeliveryForm} />
            <Route path="/payment" component={PaymentForm} />
            <Route path="/Receipt" component={Receipt} />
            <Route path="/product" component={Product} />
            <Route path="/product-management" component={ProductManagement} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
