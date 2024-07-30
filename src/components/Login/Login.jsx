import React from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm.js";
import AuthContext from "../../context/authContext.js";
import { useContext } from "react";
const LoginFormKeys = {
  Email: "email",
  Password: "password",
};
const Login = () => {
  const { loginSubmitHandler } = useContext(AuthContext);
  const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
    [LoginFormKeys.Email]: "",
    [LoginFormKeys.Password]: "",
  });
  return (
    <div className="authWrapper">
      <div className="login">
        <form id="login" onSubmit={onSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              onChange={onChange}
              name={LoginFormKeys.Email}
              placeholder="Email"
              value={values[LoginFormKeys.Email]}
              required
            />
            <FaUser className="authIcons" />
          </div>
          <div className="input-box">
            <input
              type="password"
              name={LoginFormKeys.Password}
              value={values[LoginFormKeys.Password]}
              onChange={onChange}
              placeholder="Password"
              required
            />
            <FaLock className="authIcons" />
          </div>

          <div className="remeber-forget">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forget Password</a>
          </div>
          <button type="submit" className="authBtn">
            Login
          </button>
          <div className="register-link">
            <p>Don't have an account?</p>
            <Link to={`/register`}>Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
