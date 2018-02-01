import React from "react"
import Login from "components/login/login"
import Signup from "components/signup/signup"
import arrowdown from "assets/down-arrow.png"
import "./index.css"

export default class Account extends React.Component {

  render() {
    return (
      <div className="account-page">
        <div className="login-section">
          <h2>Already have an account?</h2>
          <Login />
          <a href="#signupAnchor"><img src={arrowdown} alt="" /></a>
          <p>Not a member yet? Sign up below</p>
        </div>
        <div className="signup-section" id="signup">
          <a name="signupAnchor"><h2>New to Seize the party?</h2></a>
          <Signup />
        </div>
      </div>
    )
  }
}
