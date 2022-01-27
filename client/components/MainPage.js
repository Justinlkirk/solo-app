import React, { Component } from 'react';

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = { advice: '' };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.moneySaver = this.moneySaver.bind(this);
  }

  handleLogout() {
    // delete cookie
    this.props.changeToLogin();
  }

  handleAddFriend() {
    // add a friend
  }

  moneySaver() {
    const url = `http://localhost:3000/weather/?user_name=${this.props.user_name}`;

    fetch(url, {method: 'GET', header: {'Access-Control-Allow-Origin': ' * ', 'Content-Type': 'application/json' }})
      .then(data => data.json())
      .then((data) => this.setState({advice: data.advice}))
      .catch(err => console.log(err));
  }

  // componentDidMount() {
  //   const url = `http://localhost:3000/weather/?user_name=${this.props.user_name}`;

  //   fetch(url, {method: 'GET', header: {'Access-Control-Allow-Origin': ' * ', 'Content-Type': 'application/json' }})
  //     .then(data => data.json())
  //     .then((data) => this.setState({advice: data.advice}))
  //     .catch(err => console.log(err));
  // }

  render() {
    let h1s = [<h1>Money Saving Placeholder</h1>];
    if (this.state.advice !== '') h1s = [<h1 key='thisIsDumb'>{this.state.advice}</h1>]

    return (
      <div className='center'>
        {h1s}
        <button key='irdgaf' onClick={this.moneySaver}>Money Saver</button>
        <br/>
        <button key='idc' onClick={this.handleAddFriend}>Add Friend</button>
        <br/>
        <button key='igaf' onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}

export default MainPage;