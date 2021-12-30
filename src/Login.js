import React from "react";
import "./Login.css";
import slackLogo from "./svg/undraw.png";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="login">
      <div className="login__container">
        <img src={slackLogo} alt="" />
        <h1>Sign in to Jay's HQ</h1>
        <p>Jay.slack.com</p>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
};

export default Login;
