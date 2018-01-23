import React from "react"
import Login from "components/login/login"
import Signup from "components/signup/signup"

export default class Account extends React.Component {

  render() {
    return (
      <div>
        <Login />
        <Signup />
      </div>
    )
  }
}
