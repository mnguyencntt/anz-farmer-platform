import React from 'react';
import MyForm from './forms/MyForm.js';
import LoginForm from './forms/LoginForm.js';
import ShoppingList from './forms/ShoppingList.js';

class Login extends React.Component {
    render() {
      return (
        <div className="container">
            {/* <hr/><MyForm /> */}
            <hr/><LoginForm />
            {/* <hr/><ShoppingList /> */}
            <hr/>
        </div>
      );
    }
  }

export default Login;