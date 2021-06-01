import React, { useState } from 'react';

import { getUser, userLogin } from '../services/user.service';

function LoginPage(props: any) {
  getUser('2')

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin@123');

  const formSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    
    userLogin(username, password);
  }

  return (
    <div className="loginPageContainer">
      <div className="loginFormContainer">
        <h1>Login</h1>
        <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

        <form onSubmit={(e) => formSubmit(e as any)}>
          <div className="inputContainer">
            <label className="label">Username</label>
            <input className="input" type="username" placeholder="enter username" onChange={(e) => setUsername(e.target.value)} value={username} />
          </div>

          <div className="inputContainer">
            <label className="label">Password</label>
            <input className="input" type="password" placeholder="enter password" onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>

          <button className="btn btnColor3">Login</button>
          <button className="btn btnColor1">Clear</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;