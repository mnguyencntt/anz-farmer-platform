import React from 'react';
import MyForm from './forms/MyForm.js';
import SignUpForm from './forms/SignUpForm.js';
import ShoppingList from './forms/ShoppingList.js';

class Login extends React.Component {
    render() {
      return (
        <div className="container">
            {/* <hr/><MyForm /> */}
            <hr/><SignUpForm />
            {/* <hr/><ShoppingList /> */}
            <hr/>
        </div>
      );
    }
  }

export default Login;