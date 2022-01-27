import React, { Component } from 'react';

class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: 'USERNAME',
      password: 'PASSWORD',
      sweaterTemp: 'SWEATER TEMPERATURE',
      location: 'LOCATION',
      invalidLogin: false
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
    event.preventDefault();
    const { user_name, password, sweaterTemp, location } = this.state,
      url = `http://localhost:3000/user/?user_name=${user_name}&password=${password}&sweatertemp=${sweaterTemp}&location=${location}`

      fetch(url, {method: 'POST', header: {'Access-Control-Allow-Origin': ' * ', 'Content-Type': 'application/json' }})
        .then(data => data.json())
        .then((data) => {
          if (data.validity) {
            this.props.passUsername(this.state.user_name);
            this.props.succSignUp();
          }
          else this.setState({ invalidLogin: true })
        })
        .catch(err => console.log(err));
  }

  render() {
    const { sweaterTemp, location, user_name, password } = this.state,
      uhOh = [];
    if (this.state.invalidLogin) uhOh.push(<p className='center'>Username taken please try again</p>)

    return (
      <div className='center'>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit} className='signUp'>
          <input name="user_name" type="text" placeholder={user_name} onChange={this.handleChange}/>
          <input name="sweaterTemp" type="text" placeholder={sweaterTemp} onChange={this.handleChange}/>
          <input name="location" type="text" placeholder={location} onChange={this.handleChange}/>
          <input name="password" type="password" placeholder={password} onChange={this.handleChange}/>
          <br/>
          <input className="button" id="signUpSubmit" type='submit' value="sign up"/>
        </form>
        <button className="button" onClick={this.props.changeToLogin}>Already a user?</button>
        {uhOh}
      </div>
    );
  }
}

export default SignUpForm;