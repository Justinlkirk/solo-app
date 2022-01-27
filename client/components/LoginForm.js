import React, { Component } from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: 'USERNAME',
      password: 'PASSWORD',
      user: '',
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
    const { user_name, password } = this.state,
      url = `http://localhost:3000/user/?user_name=${user_name}&password=${password}`

    fetch(url, {method: 'GET', mode: 'no-cors', header: {'Access-Control-Allow-Origin': ' * ', 'Content-Type': 'application/json' }})
      .then(data => {
        console.log(data);
        return data.json();
      }).then((data) => console.log(data))
      // .then(() => console.log(this.state))
      event.preventDefault();
  }

  render() {
    const { user_name, password } = this.state;
    return (
      <div className='center'>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} className='signUp'>
          <input name="user_name" type="text" placeholder={user_name} onChange={this.handleChange}/>
          <input name="password" type="password" placeholder={password} onChange={this.handleChange}/>
          <input type='submit' value="login"/>
        </form>
        <button onClick={this.props.changeToSignUp}>Sign Up</button>
        <p>{JSON.stringify(this.state.user)}</p>
      </div>
    );
  }
}
export default LoginForm;