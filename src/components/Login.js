import React from 'react';
import MyForm from './forms/MyForm.js';
import LoginForm from './forms/LoginForm.js';
import ShoppingList from './forms/ShoppingList.js';
import RestController from './forms/RestController.js';
import RestAuthentication from './forms/RestAuthentication.js';

class Login extends React.Component {
    render() {
      return (
        <div className="container">
            {/* <hr/><MyForm /> */}
            <hr/><LoginForm />
            {/* <hr/><RestController /> */}
            <hr/><RestAuthentication />
            {/* <hr/><ShoppingList /> */}
            <hr/>
        </div>
      );
    }
  }

export default Login;