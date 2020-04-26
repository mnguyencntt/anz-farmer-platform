import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Navbar from './Navbar'
import Home from './Home'
import Cart from './Cart'
import Footer from './Footer'
import Login from '../components/forms/Login'
import Product from './Product'
import ProductForm from './forms/ProductForm.js'
import ProductManagement from './ProductManagement'
import SignUp from '../components/forms/SignUp'
import UserInfo from '../components/forms/UserInfo.js'
import DeliveryForm from '../components/forms/DeliveryForm.js'
import PaymentForm from '../components/forms/PaymentFormTemp.js'
import Receipt from '../components/forms/Receipt.js'
import Orders from './Orders'
import Order from './Order'

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
            <Route path="/receipt" component={Receipt} />
            <Route path="/product" component={Product} />
            <Route path="/product-management" component={ProductManagement} />
            <Route path="/product-edit" component={ProductForm} />
            <Route path="/product-create" component={ProductForm} />
            <Route path="/orders" component={Orders} />
            <Route path="/order" component={Order} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
