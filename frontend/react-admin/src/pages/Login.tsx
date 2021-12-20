import React, {SyntheticEvent, useState} from 'react';
import '../Login.css';
import axios from 'axios';
import {Navigate} from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post('login', {
      email,
      password,
    }).then((res) => {
      setRedirect(true);
    });
  };

  if (redirect) {
    return <Navigate to={'/'}/>;
  }

  return (
      <main className="form-signin">
        <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput"
                   onChange={event => setEmail(event.target.value)}
                   placeholder="name@example.com"/>
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control"
                   onChange={event => setPassword(event.target.value)}
                   id="floatingPassword" placeholder="Password"/>
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"/> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign
            in
          </button>
        </form>
      </main>
  );
};

export default Login;
