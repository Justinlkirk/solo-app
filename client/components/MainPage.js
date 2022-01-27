import React, { Component } from 'react';

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = { self: '',
      friends: {},
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.updateWeather = this.updateWeather.bind(this);
    this.removeFriend = this.removeFriend.bind(this);
  }

  removeFriend(frndName) {
    const url = `http://localhost:3000/user/friend/?user_name=${this.props.user_name}&friend_name=${frndName}`;

      fetch(url, {method: 'GET', header: {'Access-Control-Allow-Origin': ' * ', 'Content-Type': 'application/json' }})
        .catch(err => console.log(err));
  }

  handleLogout() {
    // delete cookie
    this.props.changeToLogin();
  }

  handleAddFriend() {
    const friend_name = prompt('Please enter your friend\'s name'),
      url = `http://localhost:3000/user/friend/?user_name=${this.props.user_name}&friend_name=${friend_name}`;

      fetch(url, {method: 'POST', header: {'Access-Control-Allow-Origin': ' * ', 'Content-Type': 'application/json' }})
        .catch(err => console.log(err));
  }

  updateWeather() {
    const url = `http://localhost:3000/weather/?user_name=${this.props.user_name}`;
    console.log('updated');

    fetch(url, {method: 'GET', header: {'Access-Control-Allow-Origin': ' * ', 'Content-Type': 'application/json' }})
      .then(data => data.json())
      .then((data) => this.setState(data))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.updateWeather();
    setInterval(this.updateWeather, 10000);
  }

  render() {
    let myOp = [<h1 key='ugg'>Money Saving Placeholder</h1>];
    if (this.state.self !== '') myOp = [<h1 key='thisIsDumb'>{this.state.self}</h1>]

    const friends = Object.entries(this.state.friends),
      frndOp = [];
    for (const frnd of friends) {
      const frndName = frnd[0],
        frndAdvice = frnd[1];
      frndOp.push(<h2 key={frndName}>{`${frndName} thinks you should ${frndAdvice}`}</h2>)
      frndOp.push(<button className="button" key={`${frndName} + ${frndAdvice}`} onClick={() => this.removeFriend(frndName)}>No thanks</button>)
    }

    return (
      <div key='ug' className='center'>
        {myOp}
        <button className="button" key='irdgaf' onClick={this.updateWeather}>UpdateWeather</button>
        <br/>
        <button className="button" key='idc' onClick={this.handleAddFriend}>Add Friend</button>
        <br/>
        <button className="button" key='igaf' onClick={this.handleLogout}>Logout</button>
        {frndOp}
      </div>
    )
  }
}

export default MainPage;