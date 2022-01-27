import React, { Component } from 'react';

class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: 'USERNAME',
      password: 'PASSWORD',
      sweaterTemp: 'SWEATER TEMPERATURE',
      location: 'LOCATION',
      info: 'Initial Value'
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    const userName = `user_name=${this.user_name}`,
      password = `password=${this.password}`,
      sweaterTemp = `sweaterTemp=${this.sweaterTemp}`,
      location = `location=${this.location}`,
      url = `http://localhost:3000/user/?${userName}&${password}&${sweaterTemp}&${location}`

    fetch(url)
      .then(data => {
        console.log(data)
      })
    event.preventDefault();
  }

  render() {
    const { sweaterTemp, location, user_name, password } = this.state;
    return (
      <div className='center'>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit} className='signUp'>
          <input name="user_name" type="text" placeholder={user_name} onChange={this.handleChange}/>
          <input name="email" type="text" placeholder={sweaterTemp} onChange={this.handleChange}/>
          <input name="location" type="text" placeholder={location} onChange={this.handleChange}/>
          <input name="password" type="password" placeholder={password} onChange={this.handleChange}/>
          <input type='submit' value="sign up"/>
        </form>
        <button onClick={this.props.changeToLogin}>Already a user</button>
      </div>
    );
  }
}

export default SignUpForm;