import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import MainPage from './MainPage';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = { page: 'signUp', user_name: '' }

    this.updatePage = this.updatePage.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }

  updatePage(newPage) {
    this.setState({page: newPage});
  }

  updateUsername(user_name) {
    this.setState({user_name: user_name});
  }
  
  render() {
    const currDisplay = [];
    if (this.state.page === 'signUp') currDisplay.push(<SignUpForm key = 'signUp' changeToLogin={() => this.updatePage('login')} succLogin={() => this.updatePage('main')} passUsername={(user_name) => this.updateUsername(user_name)}/>);
    else if (this.state.page === 'login') currDisplay.push(<LoginForm key = 'login' changeToSignUp={() => this.updatePage('signUp')} succLogin={() => this.updatePage('main')} passUsername={(user_name) => this.updateUsername(user_name)}/>);
    else if (this.state.page === 'main') currDisplay.push(<MainPage key = 'main' changeToLogin={() => this.updatePage('login')} user_name={this.state.user_name}/>);

    return (
      <div>
        {currDisplay}
      </div>

    );
  }
}

export default App;