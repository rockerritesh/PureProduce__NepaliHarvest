import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewForm.css";
import Logo from "../../images/Logo.png";
import Alert from "../../Alert/Alert";

const SignInForm = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };
  const containerRef = useRef(null);

  const handleSignUpClick = () => {
    containerRef.current.classList.add("sign-up-mode");
  };

  const handleSignInClick = () => {
    containerRef.current.classList.remove("sign-up-mode");
  };
  const [signupCredential, setSignupCredential] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [credential, setCredential] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupCredential;
    const response1 = await fetch(`http://localhost:4000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json1 = await response1.json();
    console.log(json1);
    if (json1.success) {
      //save the auth token and redirect
      localStorage.setItem("token", json1.authToken);
      navigate("/login");
    } else {
      showAlert("Already used email", "danger");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem("token", json.authToken);

      navigate("/login");
    } else {
      showAlert("Please Give Valid Credentials or SignUp Now!", "danger");
    }
  };

  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const handleChange1 = (e) => {
    setSignupCredential({
      ...signupCredential,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(
    () => {
      if (localStorage.getItem("token")) {
        navigate("/login");
      } else {
        navigate("/login");
      }
    }, // eslint-disable-next-line
    []
  );

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <Alert alert={alert} />
      <div className="container1" ref={containerRef}>
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={handleSubmit} className="sign-in-form form1">
              <div style={{ marginTop: "4rem" }}>
                <img
                  onClick={handleClick}
                  src={Logo}
                  alt=""
                  style={{
                    height: "60px",
                    width: "60px",
                    cursor: "pointer",
                    marginLeft: "2rem",
                  }}
                ></img>
                <p onClick={handleClick}>
                  <b>Nepali</b> Harvest
                </p>
              </div>
              <h2 className="title">Sign In</h2>
              <div className="input-field">
                <i className="bx bxs-user"></i>
                <input
                  type="email"
                  className="form-control"
                  placeholder="EMAIL"
                  id="email"
                  onChange={handleChange}
                  value={credential.email}
                  name="email"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="input-field">
                <i className="bx bxs-lock"></i>
                <input
                  type="password"
                  placeholder="PASSWORD"
                  onChange={handleChange}
                  className="form-control"
                  value={credential.password}
                  id="password"
                  name="password"
                  required
                  minLength={5}
                />
              </div>
              <input type="submit" value="Login" className="btn solid" />
            </form>
            <form onSubmit={handleSubmit1} className="form1 sign-up-form">
              <div style={{ marginTop: "4rem" }}>
                <img
                  onClick={handleClick}
                  src={Logo}
                  alt=""
                  style={{
                    height: "60px",
                    width: "60px",
                    cursor: "pointer",
                    marginLeft: "2rem",
                  }}
                ></img>
                <p onClick={handleClick}>
                  <b>Nepali</b> Harvest
                </p>
              </div>
              <h2 className="title">Sign Up</h2>
              <div className="input-field">
                <i className="bx bxs-user"></i>
                <input
                  type="text"
                  placeholder="FULL NAME"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={handleChange1}
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="input-field">
                <i className="bx bxs-envelope"></i>
                <input
                  type="email"
                  placeholder="EMAIL"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={handleChange1}
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="input-field">
                <i className="bx bxs-lock"></i>
                <input
                  type="password"
                  placeholder="PASSWORD"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleChange1}
                  required
                  minLength={5}
                />
              </div>
              <input type="submit" className="btn" value="Sign up" />
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3 style={{ fontSize: "3rem" }}>New here ?</h3>
              <p style={{ fontSize: "1.2rem" }}>
                Click On Below Signup button to register quick and have the
                advantage of this beautiful system!!!
              </p>
              <input
                type="submit"
                value="Sign Up"
                onClick={handleSignUpClick}
                id="sign-up-btn"
                className="btn solid"
              />
              <br></br>
            </div>
            <img src="img/log.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3 style={{ fontSize: "3rem" }}>Already Registered ?</h3>
              <p style={{ fontSize: "1.2rem" }}>
                Click on Below Signin button and put your correct credential and
                have the advantage of this beautiful system!!!
              </p>
              <input
                type="submit"
                value="Sign In"
                onClick={handleSignInClick}
                id="sign-in-btn"
                className="btn solid"
              />
            </div>
            <img src="img/register.svg" className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
