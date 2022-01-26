import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div />
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

// class SignUpForm extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       name: 'NAME',
//       email: 'EMAIL',
//       user_name: 'USERNAME',
//       password: 'PASSWORD',
//       info: 'Initial Value'
//     }

//     this.handleChange = this.handleChange.bind(this);
//     // this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(e) {
//     const newState = {};
//     newState[e.target.name] = e.target.value;
//     this.setState(newState);
//   }

//   // handleSubmit() {
//   //   fetch('http://localhost:3000/users')
//   //     .then(data => {
//   //       console.log(data)
//   //     })
//   // }

//   render() {
//     const { name, email, user_name, password } = this.state;
//     return (
//       <div className='center'>
//         <h1>Sign Up</h1>
//         <form onSubmit={/*this.handleSubmit*/} className='signUp'>
//           <input name="name" type="text" placeholder={name} onChange={this.handleChange}/>
//           <input name="email" type="text" placeholder={email} onChange={this.handleChange}/>
//           <input name="username" type="text" placeholder={user_name} onChange={this.handleChange}/>
//           <input name="password" type="password" placeholder={password} onChange={this.handleChange}/>
//           <input type='submit' value="sign up"/>
//         </form>
//         <p>{this.state.info}</p>
//       </div>
//     );
//   }
// }

export default App;