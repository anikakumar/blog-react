import React, { Component } from 'react';
import './Login.css';

class Register extends Component {
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
        <div id="box" className="Register  mt-2">
          <input className="mr-2" type="text" id="username" placeholder="New Email" onChange={this.onUsernameChange} />
          <input type="password" id="password" placeholder="New Password" onChange={this.onPasswordChange} />
          <button className="btn btn-outline-primary ml-2" id="register_btn" onClick={() =>
            {
              this.props.regFunction(this.state.username, this.state.password)
            }}
            >Register</button>
        </div>
      );
    }
  }
  
  export default Register;
  