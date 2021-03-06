import React from "react"
import { withRouter } from "react-router-dom"
import "./index.css"

class Signup extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      name: "",
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

  handleName = event => {
    this.setState({
      name: event.target.value
    })
  }

  handleAlert = () => {
    this.setState({
      message: "User already exists"
    })
    setTimeout(() => {
      this.setState({ message: "" })
    }, 3500)
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch("https://seizethepartyevents.herokuapp.com/signup", {
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
            localStorage.setItem("userEmail", json.userEmail)
            this.props.history.push("/create-event/")
          })
      } else {
        this.handleAlert()
      }
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="signup-form">
          <p id="signup-message">{this.state.message}</p>
          <div><input type="text" value={this.state.name} onChange={this.handleName} required placeholder="Name" /></div>
          <div><input type="email" value={this.state.email} onChange={this.handleEmail} required placeholder="Email" /></div>
          <div>
            <input
              type="password"
              value={this.state.password}
              onChange={this.handlePassword}
              required
              placeholder="Password"
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
              title="Password must contain at least one lowercase, one uppercase and a number." />
          </div>
          <button className="medium-blue-btn" type="submit">Sign up</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Signup)
