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
          <img src={arrowdown} alt="" />
          <p>Not a member yet? Sign up below</p>
        </div>
        <div className="signup-section" id="signup">
          <h2>New to Seize the party?</h2>
          <Signup />
        </div>
      </div>
    )
  }
}
