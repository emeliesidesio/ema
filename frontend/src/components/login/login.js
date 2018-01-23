import React from "react"
// import { Redirect } from "react-router-dom"
import { withRouter } from "react-router-dom"

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

  handleSubmit = event => {
    event.preventDefault()
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.ok) {
        this.props.history.push("/dashboard")
      } else {
        console.log("Unknown user")
      }
      this.setState ({
        email: "",
        password: ""
      }, () => { console.log("State has been reset", response, response.status) })
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="login-form">
          {/* {this.state.complete && <Redirect to="/dashboard" />} */}
          <div>Email<input type="email" value={this.state.email} onChange={this.handleEmail} required /></div>
          <div>Password<input type="password" value={this.state.password} onChange={this.handlePassword} required /></div>
          <button type="submit">Log in</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Login)
