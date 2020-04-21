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

  function handleClick() {
    history.push('/');
  }

  return (
    <button type='button' onClick={handleClick}>
      Go home
    </button>
  );
}