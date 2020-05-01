import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory
} from "react-router-dom";

export function HomeButton() {
  let history = useHistory();
  function handleClick() { history.push('/'); }
  return (<button type='button' onClick={handleClick}>Home</button>);
}

export function LoginButton() {
  let history = useHistory();
  function handleClick() { history.push('/login'); }
  return (<button type='button' onClick={handleClick}>Login</button>);
}

export function LogoutButton(props) {
  let history = useHistory();
  function handleClick() {
    //alert('LogoutButton handleClick: ' + props.usernameInfo);
    localStorage.removeItem('username');
    history.push('/');
    window.location.reload();
  }
  return (<a onClick={handleClick}>Logout</a>);
}

export function UserInfoButton() {
  let history = useHistory();
  function handleClick() { history.push('/userInfo'); }
  return (<button type='button' onClick={handleClick}>User-Info</button>);
}

export function DeliveryButton() {
  let history = useHistory();
  function handleClick() { history.push('/delivery'); }
  return (<button type='button' onClick={handleClick}>Delivery</button>);
}

export function NotificationButton() {
  let history = useHistory();
  function handleClick() { history.push('/notification'); }
  return (<button type='button' onClick={handleClick}>Notification</button>);
}

// generate Random Id
export function generateId(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  // Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return result;
}

// current time
export function getCurrentTime() {
  var currentDate = new Date();
  var date = currentDate.getDate(); // Current Date
  var month = currentDate.getMonth() + 1; // Current Month
  var year = currentDate.getFullYear(); // Current Year
  var hours = currentDate.getHours(); // Current Hours
  var min = currentDate.getMinutes(); // Current Minutes
  var sec = currentDate.getSeconds(); // Current Seconds
  var milSec = currentDate.getMilliseconds(); // Current Milliseconds
  return date + '' + month + '' + year + '' + hours + '' + min + '' + sec + '' + milSec;
}

// check null or empty
export function isEmpty(input) {
  if (input === undefined || input === null || input === '' || input === "") {
    return true;
  }
  return false;
}