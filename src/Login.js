import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
  }
  
  onUsernameChange = (text) => {
    this.setState({username: text.target.value});
  }
  
  onPasswordChange = (text) => {
    this.setState({password: text.target.value});
  }
  
  render() {
    return (
      <div id="box" className="Login">
        <input className="mr-2" type="text" id="username" placeholder="Username" onChange={this.onUsernameChange} />
        <input type="password" id="password" placeholder="Password" onChange={this.onPasswordChange} />
        <button className="btn btn-outline-primary ml-2" id="login_btn" onClick={() =>
          {
            this.props.loginFunction(this.state.username, this.state.password);
            console.log("login.js", this.state.username);
          }}
          >Login</button>
      </div>
    );
  }
}

export default Login;
