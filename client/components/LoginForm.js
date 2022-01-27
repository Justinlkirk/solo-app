import React, { Component } from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: 'USERNAME',
      password: 'PASSWORD',
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
    const { user_name, password } = this.state,
      url = `http://localhost:3000/user/?user_name=${user_name}&password=${password}`

    fetch(url, {method: 'GET', header: {'Access-Control-Allow-Origin': ' * ', 'Content-Type': 'application/json' }})
      .then(data => data.json())
      .then((data) => {
        if (data.validity) this.props.succLogin();
        else this.setState({ invalidLogin: true })
      })
      .catch(err => console.log(err));
      // .then(() => console.log(this.state))
  }

  render() {
    const uhOh = [];
    if (this.state.invalidLogin) uhOh.push(<p className='center'>Invalid login try again</p>)

    const { user_name, password } = this.state;
    return (
      <div className='center'>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} className='signUp'>
          <input name="user_name" type="text" placeholder={user_name} onChange={this.handleChange}/>
          <input name="password" type="password" placeholder={password} onChange={this.handleChange}/>
          <input className='submit' type='submit' value="login"/>
        </form>
        {uhOh}
        <div></div>
        <button onClick={this.props.changeToSignUp}>Sign Up</button>
      </div>
    );
  }
}
export default LoginForm;