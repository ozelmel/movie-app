import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword, signIn, signUpProvider } from "../auth/firebase";
import { ReactComponent as SVGIcon } from "../images/Icon.svg";


const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signIn(email, password, navigate);
    console.log(email, password);
  };
  const handleProviderLogin = () => {
    signUpProvider(navigate);
  }
  return (
    <div className="d-flex justify-content-center">
      <div className="form-image d-none d-md-block">
        <img src={"https://picsum.photos/800/800"} alt="sample-movie" />
      </div>
      <div className="register-form">
        <h1 className="form-title display-3">Login</h1>
        <form id="register" onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="e-mail" className="form-label">
              Email
            </label>
            <input
              autoFocus
              type="email"
              className="form-control"
              id="e-mail"
              placeholder="Enter your e-mail.."
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password.."
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="link" onClick={() => forgotPassword(email)}>
              Forgot Password?
            </div>
            <input
              type="submit"
              className="btn btn-primary form-control"
              value="Login"
            />
          </div>
        </form>
        <button
          className="btn btn-primary form-control"
          onClick={handleProviderLogin}
        >
          Continue with Google {<SVGIcon />}
        </button>
      </div>
    </div>
  );
};

export default Login;
