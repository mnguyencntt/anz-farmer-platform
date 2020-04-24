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
