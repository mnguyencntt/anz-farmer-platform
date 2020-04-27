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
import Checkout from '../components/forms/Checkout.js'
import Receipt from '../components/forms/receipt.js'
<<<<<<< HEAD
import ProductReview from '../components/forms/review.js'
=======
import Orders from './Orders'
import Order from './Order'

>>>>>>> e31e7047acc85e8288d0139349c3141766a9cf20
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
<<<<<<< HEAD
            <Route path="/delivery" component={DeliveryForm} />
            <Route path="/payment" component={PaymentForm} />
            <Route path="/Receipt" component={Receipt} />
            <Route path="/ProductReview" component={ProductReview} />
=======
            <Route path="/checkout" component={Checkout} />
            <Route path="/receipt" component={Receipt} />
>>>>>>> e31e7047acc85e8288d0139349c3141766a9cf20
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
