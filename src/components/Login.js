import React from 'react';
import LoginForm from './forms/LoginForm.js';
import ShoppingList from './forms/ShoppingList.js';
import RestController from './forms/RestController.js';
import RestAuthentication from './forms/RestAuthentication.js';
import LoginControl from './forms/LoginControl.js';

export default class Login extends React.Component {
  render() {
    return (
      <div className="container">
        {/* <hr/><MyForm /> */}
        <hr /><LoginForm />
        {/* <hr/><RestController /> */}
        {/* <hr/><RestAuthentication /> */}
        {/* <hr/><ShoppingList /> */}
        {/* <LoginControl /> */}
      </div>
    );
  }
}