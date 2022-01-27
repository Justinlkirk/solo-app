import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import MainPage from './MainPage';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = { page: 'signUp' }

    this.updatePage = this.updatePage.bind(this);
  }

  updatePage(newPage) {
    this.setState({page: newPage});
  }
  
  render() {
    const currDisplay = [];
    if (this.state.page === 'signUp') currDisplay.push(<SignUpForm key = 'signUp' changeToLogin={() => this.updatePage('login')} succLogin={() => this.updatePage('main')} />);
    else if (this.state.page === 'login') currDisplay.push(<LoginForm key = 'login' changeToSignUp={() => this.updatePage('signUp')} succLogin={() => this.updatePage('main')} />);
    else if (this.state.page === 'main') currDisplay.push(<MainPage key = 'main' changeToLogin={() => this.updatePage('login')}/>);

    return (
      <div>
        {currDisplay}
      </div>

    );
  }
}

export default App;