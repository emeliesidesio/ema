import React from "react"
import Login from "components/login/login"
import Signup from "components/signup/signup"
import "./index.css"

export default class Account extends React.Component {

  render() {
    return (
      <div className="account-page">
        <Login />
        <Signup />
      </div>
    )
  }
}
