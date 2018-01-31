import React from "react"
import { withRouter } from "react-router-dom"
import "./index.css"

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      message: ""
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

  handleAlert = () => {
    this.setState({
      message: "Email and password doesn't match!"
    })
    setTimeout(() => {
      this.setState({ message: "" })
    }, 3500)
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch("https://seizethepartyevents.herokuapp.com/login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.ok) {
        return response.json()
          .then(json => {
            localStorage.setItem("userAccess", json.accessToken)
            localStorage.setItem("userId", json.userId)
            this.props.history.push("/dashboard/")
          })
      } else {
        this.handleAlert()
      }
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="login-form">
          <div><input type="email" value={this.state.email} onChange={this.handleEmail} required placeholder="Email" /></div>
          <div><input type="password" value={this.state.password} onChange={this.handlePassword} required placeholder="Password" /></div>
          <button className="medium-red-btn" type="submit">Log in</button>
          <p id="login-message">{this.state.message}</p>
        </form>
      </div>
    )
  }
}

export default withRouter(Login)
