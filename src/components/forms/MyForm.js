import React from 'react';

export default class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      age: null,
      errormessage: ''
    };
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let err = '';
    if (nam === "age") {
      if (val !== "" && !Number(val)) {
        err = <strong>Your age must be a number</strong>;
      }
    }
    this.setState({ errormessage: err });
    this.setState({ [nam]: val });
  }
  shoot() {
    this.setState({ username: "MinhNguyen Shoot" });
  }
  render() {
    return (
      <form>
        <h1>Hello {this.state.username} {this.state.age}</h1>
        <p>Enter your name:</p>
        <input
          type='text'
          name='username'
          onChange={this.myChangeHandler}
        />
        <p>Enter your age:</p>
        <input
          type='text'
          name='age'
          onChange={this.myChangeHandler}
        />
        {this.state.errormessage}
        <p></p>
        <button onClick={this.shoot}>Take the shot!</button>
      </form>
    );
  }
}
