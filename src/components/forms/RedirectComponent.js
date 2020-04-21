import React from 'react'
import { Redirect } from 'react-router-dom'

class RedirectComponent extends React.Component {
  state = {
    redirect: false
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      if (localStorage.getItem('username') === null) {
        return <Redirect to='/login' />
      } else {
        return <Redirect to='/delivery' />
      }
    }
  }
  render () {
    return (
       <div>
        {this.renderRedirect()}
        <button onClick={this.setRedirect}>Redirect</button>
       </div>
    )
  }
}

export default RedirectComponent