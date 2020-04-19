import React from 'react';
import SignUpForm from './forms/SignUpForm.js';

export default class SignUp extends React.Component {
  render() {
    return (
      <div className="container">
        <SignUpForm />
      </div>
    );
  }
}