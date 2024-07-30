import React, { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext.js";
import useForm from "../../hooks/useForm.js";

import { FaLock } from "react-icons/fa";
const RegisterFormKeys = {
  Username: "username",
  Email: "email",
  Password: "password",
  ConfirmPassword: "confirm-password",
};
const Register = () => {
  const { registerSubmitHandler } = useContext(AuthContext);

  const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
    [RegisterFormKeys.Username]: "",
    [RegisterFormKeys.Email]: "",
    [RegisterFormKeys.Password]: "",
    [RegisterFormKeys.ConfirmPassword]: "",
  });
  return (
    <div className="authWrapper">
      <div className="login">
        <form action="" id="register" onSubmit={onSubmit}>
          <h1>Register</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={values[RegisterFormKeys.Username]}
              name={RegisterFormKeys.Username}
              onChange={onChange}
              required
            />
            <FaUser className="authIcons" />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              value={values[RegisterFormKeys.Email]}
              name={RegisterFormKeys.Email}
              onChange={onChange}
              required
            />
            <FaUser className="authIcons" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={values[RegisterFormKeys.Password]}
              name={RegisterFormKeys.Password}
              onChange={onChange}
              required
            />
            <FaLock className="authIcons" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Confirm Password"
              value={values[RegisterFormKeys.ConfirmPassword]}
              name={RegisterFormKeys.ConfirmPassword}
              onChange={onChange}
              required
            />
            <FaLock className="authIcons" />
          </div>
          <div className="remeber-forget">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
          </div>
          <button type="submit" className="authBtn">
            Register
          </button>
          <div className="register-link">
            <p>Already have an account?</p>
            <Link to={`/login`}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
