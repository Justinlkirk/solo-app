import React, { Component } from 'react';

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = { advice: 'Uh oh spaghettios ya done messed up infront of everyone!' };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
  }

  handleLogout() {
    // delete cookie
    this.props.changeToLogin();
  }

  handleAddFriend() {
    // add a friend
  }



  render() {
    

    return (
      <div className='center'>
        <h1>{this.state.advice}</h1>
        <button key='idc' onClick={this.handleAddFriend}>Add Friend</button>
        <br/>
        <button key='igaf' onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}

export default MainPage;