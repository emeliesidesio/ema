import React from "react"
import { withRouter } from "react-router-dom"
import "./index.css"

class Signup extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    }
  }

  handleEmail = event => {
    this.setState({
      email: event.target.value
    })
  }

  handlePassword = event => {
    this.setState({
      password: event.target.value
    })
  }

  handleFirstName = event => {
    this.setState({
      firstName: event.target.value
    })
  }

  handleLastName = event => {
    this.setState({
      lastName: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        console.log("the email is already registered")
      }
    }).then(json => {
      localStorage.setItem("userAccess", json.accessToken)
      localStorage.setItem("userId", json.userId)
      this.props.history.push("/create-event/")
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="signup-form">
          <div><input type="text" value={this.state.firstName} onChange={this.handleFirstName} required placeholder="First name" /></div>
          <div><input type="text" value={this.state.lastName} onChange={this.handleLastName} required placeholder="Last name" /></div>
          <div><input type="email" value={this.state.email} onChange={this.handleEmail} required placeholder="Email" /></div>
          <div><input type="password" value={this.state.password} onChange={this.handlePassword} required placeholder="Password" /></div>
          <button className="medium-blue-btn" type="submit">Sign up</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Signup)
