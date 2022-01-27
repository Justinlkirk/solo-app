import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {page: 'signUp'}

    this.updatePage = this.updatePage.bind(this);
  }

  updatePage(newPage) {
    this.setState({page: newPage});
  }
  
  render() {
    const currDisplay = [];
    if (this.state.page === 'signUp') currDisplay.push(<SignUpForm key = 'signUp' changeToLogin={() => this.updatePage('login')} />);
    else if (this.state.page === 'login') currDisplay.push(<LoginForm key = 'login' changeToSignUp={() => this.updatePage('signUp')} />);
    return (
      <div>
        {currDisplay}
      </div>

    );
  }
}

{/* <div className='center'>
        <h1>Login</h1>
        <form method="POST" action='/login' className='login'>
          <input name="username" type="text" placeholder="USERNAME"></input>
          <input name="password" type="password" placeholder="PASSWORD"></input>
          <input type='submit' value="login"/>
        </form>
        <p>{this.fields}</p>
      </div> */}

export default App;