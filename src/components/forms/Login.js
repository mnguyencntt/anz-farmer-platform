import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { authenticateUser } from '../reducers/thunks';


const LoginForm = ({ authenticateUser, isAuthenticatingUser, token }) => {
  const [inputUsername, setInputUsernameValue] = useState('testuser');
  const [inputPassword, setInputPasswordValue] = useState('testpassword');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const doesLoginFail = isSubmitted && !isAuthenticatingUser && !token;
  const loginForm = (
    <div className="container">
      {/* <form onSubmit={this.handleSubmit}> */}
      <h2>Login</h2>
      {doesLoginFail && <h4><span className="red darken-1">Login Fail</span></h4>}
      {isAuthenticatingUser && <h4><span className='blue lighten-1'>Authenticating ...</span></h4>}
      <label>
        Username:
          <input type="text" name="username" value={inputUsername} onChange={e => setInputUsernameValue(e.target.value)} /> 
      </label>
      <label>
        Password:
          <input type="text" name="password" value={inputPassword} onChange={e => setInputPasswordValue(e.target.value)} /> 
      </label>
      <p></p>
      <input type="submit" onClick={()=>{setIsSubmitted(true); authenticateUser(inputUsername, inputPassword)}} value="Submit" className="waves-effect waves-light btn" />
      <p></p>
      {/* </form> */}
    </div>
  );

  if (token) {
    return <Redirect to='/' />
  }

  return loginForm;
};

const mapStateToProps = (state) => ({
  isAuthenticatingUser: state.isAuthenticatingUser,
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (user, passwd) => { dispatch(authenticateUser(user, passwd))}
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)