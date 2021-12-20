import React, {Component, SyntheticEvent} from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom';

class Register extends Component {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  passwordConfirm = '';

  state = {
    redirect: false,
  };

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post('register', {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      password: this.password,
      password_confirm: this.passwordConfirm,
    }).then((res) => {
      this.setState({
        redirect: true,
      });
    });

  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={'/login'}/>;
    }

    return (
        <main className="form-signin">
          <form onSubmit={this.submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>

            <div className="form-floating">
              <input className="form-control"
                     onChange={event => this.firstName = event.target.value}
                     placeholder="First Name"/>
              <label>First Name</label>
            </div>

            <div className="form-floating">
              <input className="form-control"
                     onChange={event => this.lastName = event.target.value}
                     placeholder="Last Name"/>
              <label>Last Name</label>
            </div>

            <div className="form-floating">
              <input type="email" className="form-control"
                     onChange={event => this.email = event.target.value}
                     placeholder="name@example.com"/>
              <label>Email address</label>
            </div>

            <div className="form-floating">
              <input type="password" className="form-control"
                     onChange={event => this.password = event.target.value}
                     placeholder="Password"/>
              <label>Password</label>
            </div>

            <div className="form-floating">
              <input type="password" className="form-control"
                     onChange={event => this.passwordConfirm = event.target.value}
                     placeholder="Password Confirm"/>
              <label>Password Confirm</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary"
                    type="submit">Submit
            </button>
          </form>
        </main>
    );
  }
}

export default Register;